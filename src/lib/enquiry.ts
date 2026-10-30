"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { getProduct } from "@/content/products";
import { site } from "@/content/site";
import { enquirySchema, type Enquiry, type EnquiryState } from "./enquiry-schema";

// ponytail: per-instance memory, so each serverless instance limits on its own.
// Move to Upstash/Vercel KV if abuse shows up across instances.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

function formatEnquiry(e: Enquiry) {
  const product = e.product ? getProduct(e.product)?.name : "";
  return [
    ["Name", e.name],
    ["Organisation", e.organisation],
    ["I am a", e.role],
    ["Email", e.email],
    ["Phone", e.phone],
    ["City", e.city],
    ["Product", product],
    ["Topic", e.topic],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .concat(["", e.message])
    .join("\n");
}

async function deliver(e: Enquiry) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV === "production") throw new Error("RESEND_API_KEY is not configured");
    console.info(`[enquiry] RESEND_API_KEY not set — logging instead of emailing:\n${formatEnquiry(e)}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM_EMAIL ?? "Ginerva website <website@ginerva.com>",
      to: [process.env.ENQUIRY_TO_EMAIL ?? site.email],
      reply_to: e.email,
      subject: `Website enquiry — ${e.name}${e.organisation ? ` (${e.organisation})` : ""}`,
      text: formatEnquiry(e),
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
}

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const raw = Object.fromEntries(
    [...formData.entries()].filter(([k, v]) => !k.startsWith("$") && typeof v === "string"),
  ) as Record<string, string>;

  // Honeypot: real users never see this field. Pretend success so bots don't retry.
  if (raw.website) return { status: "success", message: "Thank you — we'll be in touch shortly." };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return { status: "error", message: `Too many enquiries from this connection. Please email ${site.email}.`, values: raw };
  }

  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors: z.flattenError(parsed.error).fieldErrors,
      values: raw,
    };
  }

  try {
    await deliver(parsed.data);
  } catch (err) {
    console.error("[enquiry] delivery failed", err);
    return {
      status: "error",
      message: `We couldn't send your enquiry just now. Please email us at ${site.email} — nothing you typed has been lost.`,
      values: raw,
    };
  }

  return { status: "success", message: "Thank you — your enquiry has reached our team. We'll be in touch shortly." };
}
