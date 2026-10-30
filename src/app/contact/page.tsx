import type { Metadata } from "next";
import { ArrowUpRight, Mail } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero } from "@/components/page-hero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Enquire about Ginerva medical devices, distribution and private label manufacturing.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to" accent="our team.">
        Product enquiries, demos, distribution and private label: tell us a little about you and we will route it to the right
        person.
      </PageHero>

      <section className="container-page grid gap-10 pb-16 md:pb-20 lg:grid-cols-12">
        <div className="rounded-[var(--radius-stage)] border border-line bg-white p-6 shadow-card md:p-10 lg:col-span-7">
          <EnquiryForm />
        </div>

        <aside className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9">
          <a href={`mailto:${site.email}`} className="group flex items-center gap-4 rounded-[var(--radius-stage)] bg-navy-700 p-6 text-white">
            <Mail aria-hidden className="size-6 text-mint" />
            <span>
              <span className="block text-sm text-white/70">Email</span>
              <span className="text-lg font-medium">{site.email}</span>
            </span>
          </a>
          {site.addresses.map((a) => (
            <address key={a.label} className="not-italic">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-600">{a.label}</p>
              <p className="mt-3 leading-relaxed text-ink">
                {a.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.lines.join(", "))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-navy-700 underline underline-offset-4"
              >
                Open in Google Maps <ArrowUpRight aria-hidden className="size-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </address>
          ))}
        </aside>
      </section>
    </>
  );
}
