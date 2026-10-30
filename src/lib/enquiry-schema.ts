import { z } from "zod";
import { products } from "@/content/products";

export const roles = [
  "Clinician",
  "Clinic owner",
  "Hospital / procurement",
  "Distributor",
  "Private-label partner",
  "Other",
] as const;

const optionalText = (max: number) => z.string().trim().max(max).default("");

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  organisation: optionalText(160),
  role: z.enum(roles, { error: "Please tell us who you are." }),
  email: z.email("Please enter a valid email address.").trim(),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9 ()-]{7,20}$/, "Please enter a valid phone number."),
  city: optionalText(80),
  product: z
    .string()
    .default("")
    .refine((v) => v === "" || products.some((p) => p.slug === v), "Unknown product."),
  topic: optionalText(80),
  message: z.string().trim().min(10, "Please tell us a little more (at least 10 characters).").max(3000),
  consent: z.literal("on", { error: "Please agree so we can reply to you." }),
});

export type Enquiry = z.infer<typeof enquirySchema>;
export type EnquiryField = keyof Enquiry;

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<EnquiryField, string[]>>;
  values?: Partial<Record<EnquiryField, string>>;
};
