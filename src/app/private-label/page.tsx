import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero } from "@/components/page-hero";
import { Eyebrow } from "@/components/ui";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "Private label manufacturing",
  description: "Medical devices manufactured to your specifications, under your brand, in Ginerva's ISO 13485 certified cleanroom facility.",
  alternates: { canonical: "/private-label" },
};

const steps = [
  { title: "Brief", text: "Share the product, specification and volumes you have in mind." },
  { title: "Feasibility", text: "We confirm what our facility and quality system can deliver, and on what timeline." },
  { title: "Build", text: "Manufactured under the same ISO 13485 processes as our own range." },
  { title: "Your brand", text: "Delivered under your brand name, with documentation to match." },
];

export default function PrivateLabelPage() {
  return (
    <>
      <PageHero eyebrow="Private label" title="Your brand." accent="Our cleanroom.">
        {company.privateLabel}
      </PageHero>

      <section aria-label="How private label works" className="container-page pb-16">
        <ol className="grid gap-x-8 gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} data-reveal>
              <span className="font-mono text-sm text-navy-600">0{i + 1}</span>
              <h2 className="mt-4 text-xl font-medium tracking-tight">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="pl-form-heading" className="bg-mint-soft/40 py-16 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow className="text-forest!">Start a conversation</Eyebrow>
            <h2 id="pl-form-heading" className="mt-6 text-3xl font-medium tracking-tight md:text-4xl">
              Tell us what you want to build.
            </h2>
          </div>
          <div className="rounded-[var(--radius-stage)] bg-white p-6 shadow-card md:p-10 lg:col-span-8">
            <EnquiryForm topic="Private label manufacturing" defaultRole="Private-label partner" />
          </div>
        </div>
      </section>
    </>
  );
}
