"use client";

import Link from "next/link";
import { useActionState, useId } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { products } from "@/content/products";
import { submitEnquiry } from "@/lib/enquiry";
import { roles, type EnquiryField, type EnquiryState } from "@/lib/enquiry-schema";

const inputClass =
  "min-h-12 w-full rounded-xl border border-line bg-white px-4 text-[0.95rem] text-ink transition-colors placeholder:text-muted/60 hover:border-navy-200 focus:border-navy-600 focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-navy-600/10 aria-[invalid=true]:border-ember";

export function EnquiryForm({
  product = "",
  topic = "",
  defaultRole,
  compact = false,
}: {
  product?: string;
  topic?: string;
  defaultRole?: (typeof roles)[number];
  compact?: boolean;
}) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, { status: "idle" });
  const id = useId();
  const v = state.values ?? {};
  const err = (f: EnquiryField) => state.errors?.[f]?.[0];

  const field = (name: EnquiryField, label: string, input: React.ReactElement, opts: { optional?: boolean; wide?: boolean } = {}) => {
    const error = err(name);
    return (
      <div className={`flex flex-col gap-2 ${opts.wide ? "sm:col-span-2" : ""}`}>
        <label htmlFor={`${id}-${name}`} className="text-sm font-medium text-ink">
          {label}
          {opts.optional && <span className="font-normal text-muted"> (optional)</span>}
        </label>
        {input}
        {error && (
          <p id={`${id}-${name}-error`} className="text-sm text-ember">
            {error}
          </p>
        )}
      </div>
    );
  };

  const a11y = (name: EnquiryField) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": err(name) ? true : undefined,
    "aria-describedby": err(name) ? `${id}-${name}-error` : undefined,
  });

  return (
    <form action={action} className="grid gap-5">
      <div aria-live="polite" role="status">
        {state.status === "success" && (
          <p className="flex items-start gap-3 rounded-2xl bg-mint-soft/50 p-4 text-sm text-forest">
            <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0" />
            {state.message}
          </p>
        )}
        {state.status === "error" && state.message && (
          <p className="rounded-2xl bg-ember-soft/30 p-4 text-sm text-ember">{state.message}</p>
        )}
      </div>

      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        {field("name", "Full name", <input {...a11y("name")} required minLength={2} autoComplete="name" defaultValue={v.name} className={inputClass} />)}
        {field(
          "organisation",
          "Clinic / organisation",
          <input {...a11y("organisation")} autoComplete="organization" defaultValue={v.organisation} className={inputClass} />,
          { optional: true },
        )}
        {field(
          "role",
          "I am a",
          // Keyed so a restored value remounts the select: React's post-action form reset ignores defaultValue updates on <select>.
          <select
            key={v.role ?? "initial"}
            {...a11y("role")}
            required
            defaultValue={v.role ?? defaultRole ?? ""}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="" disabled>
              Select one
            </option>
            {roles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>,
        )}
        {field("email", "Email", <input {...a11y("email")} type="email" required autoComplete="email" defaultValue={v.email} className={inputClass} />)}
        {field(
          "phone",
          "Phone",
          <input
            {...a11y("phone")}
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91"
            pattern="^\+?[0-9 ()\-]{7,20}$"
            defaultValue={v.phone}
            className={inputClass}
          />,
        )}
        {field("city", "City", <input {...a11y("city")} autoComplete="address-level2" defaultValue={v.city} className={inputClass} />, { optional: true })}
        {field(
          "product",
          "Product of interest",
          <select key={v.product ?? "initial"} {...a11y("product")} defaultValue={v.product ?? product} className={`${inputClass} cursor-pointer`}>
            <option value="">General enquiry</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>,
          { optional: true, wide: !compact },
        )}
        {field(
          "message",
          "Message",
          <textarea
            {...a11y("message")}
            required
            minLength={10}
            rows={compact ? 4 : 5}
            defaultValue={v.message}
            className={`${inputClass} py-3`}
          />,
          { wide: !compact },
        )}
      </div>

      <input type="hidden" name="topic" value={topic} />
      {/* Honeypot — hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
          <input
            {...a11y("consent")}
            type="checkbox"
            required
            defaultChecked={v.consent === "on"}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-navy-700"
          />
          <span>
            I agree that Ginerva may use these details to respond to my enquiry, as described in the{" "}
            <Link href="/legal/privacy" className="text-navy-700 underline underline-offset-4">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {err("consent") && (
          <p id={`${id}-consent-error`} className="text-sm text-ember">
            {err("consent")}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-navy-700 px-7 font-medium text-white transition-colors hover:bg-navy-800 active:translate-y-px disabled:cursor-wait disabled:opacity-70 sm:justify-self-start"
      >
        {pending ? (
          <>
            <LoaderCircle aria-hidden className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send enquiry <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
