import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Eyebrow } from "@/components/ui";
import { certifications, company, qualitySteps, verifiedCertifications } from "@/content/site";

export const metadata: Metadata = {
  title: "Quality",
  description: "ISO 13485:2016 certified quality management, cleanroom manufacturing and Ginerva's quality policy.",
  alternates: { canonical: "/quality" },
};

export default function QualityPage() {
  const { qualityPolicy } = company;
  return (
    <>
      <PageHero eyebrow="Quality" title="Quality is built in," accent="not checked at the end.">
        {company.quality}
      </PageHero>

      <section aria-label="Certifications" className="container-page pb-16">
        <ul className="grid gap-4 sm:grid-cols-3">
          {verifiedCertifications.map((id) => {
            const c = certifications[id];
            return (
              <li key={id} data-reveal className="flex items-center gap-5 rounded-[var(--radius-stage)] border border-line bg-white p-6">
                {c.logo ? (
                  <Image src={c.logo} alt="" width={64} height={64} className="size-14 object-contain mix-blend-multiply" />
                ) : (
                  <span aria-hidden className="grid size-14 place-items-center rounded-full bg-navy-700 font-mono text-xs font-semibold text-white">
                    ISO
                  </span>
                )}
                <span>
                  <span className="block font-medium">{c.name}</span>
                  <span className="text-sm text-muted">{c.detail}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="on-dark bg-navy-950 py-16 text-white md:py-20">
        <div className="container-page">
          <Eyebrow>How a Ginerva device is made</Eyebrow>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-stage)] bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {qualitySteps.map((s, i) => (
              <li key={s.title} data-reveal className="bg-navy-950 p-8">
                <span className="font-mono text-sm text-mint">0{i + 1}</span>
                <h2 className="mt-10 text-xl font-medium tracking-tight">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="policy-heading" className="container-page grid gap-10 py-16 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>Quality policy</Eyebrow>
          <h2 id="policy-heading" className="mt-6 text-3xl font-medium tracking-tight md:text-4xl">
            {qualityPolicy.statement}
          </h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <p className="text-muted">To achieve this, we commit to:</p>
          <ol className="mt-6 divide-y divide-line border-y border-line">
            {qualityPolicy.commitments.map((c, i) => (
              <li key={c} data-reveal className="grid grid-cols-[3rem_1fr] gap-4 py-5 leading-relaxed">
                <span className="font-mono text-sm text-navy-600">0{i + 1}</span>
                {c}
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-muted">{qualityPolicy.footer}</p>
        </div>
      </section>
    </>
  );
}
