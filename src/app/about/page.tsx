import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { ButtonLink, Eyebrow, SpeedLines } from "@/components/ui";
import { company, specialities } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "Ginerva Universal Corporation LLP: medical device assembly, manufacturing and distribution from Puducherry, India.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Ginerva" title="Built by people who know" accent="the clinic.">
        {company.story[0]}
      </PageHero>

      <section className="container-page grid gap-10 pb-16 md:pb-20 lg:grid-cols-12 lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-stage)] bg-stage lg:col-span-6">
          <Image
            src="/about-clinic.jpg"
            alt="A clinician treating a patient's arm with the Skynis Trim & Firm massage roller in a bright clinic"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            data-parallax="30"
            suppressHydrationWarning
            className="scale-110 object-cover object-[50%_45%]"
          />
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <Eyebrow data-reveal>Our story</Eyebrow>
          <p data-reveal className="mt-6 text-2xl font-medium leading-snug tracking-tight text-navy-950 md:text-3xl">
            {company.story[1]}
          </p>
        </div>
      </section>

      <section className="on-dark bg-navy-950 py-16 text-white md:py-20">
        <div className="container-page grid gap-12 md:grid-cols-2">
          {[
            { label: "Vision", text: company.vision },
            { label: "Mission", text: company.mission },
          ].map((b) => (
            <div key={b.label} data-reveal className="border-t border-white/15 pt-8">
              <p className="font-serif text-4xl italic text-lavender">{b.label}</p>
              <p className="mt-6 leading-relaxed text-white/75 md:text-lg">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow data-reveal>What we do</Eyebrow>
            <p data-reveal className="mt-6 text-lg leading-relaxed text-muted">
              {company.whatWeDo}
            </p>
            <SpeedLines unit={18} className="mt-10" />
          </div>
          <ol className="divide-y divide-line border-y border-line lg:col-span-6 lg:col-start-7">
            {specialities.map((s, i) => (
              <li key={s.slug} data-reveal className="grid grid-cols-[3rem_1fr] gap-4 py-8">
                <span className="font-mono text-sm text-navy-600">0{i + 1}</span>
                <div>
                  <h2 className="flex flex-wrap items-center gap-3 text-2xl font-medium tracking-tight">
                    {s.name}
                    {s.status === "coming-soon" && (
                      <span className="rounded-full border border-line px-2.5 py-0.5 text-xs font-normal text-muted">In development</span>
                    )}
                  </h2>
                  <p className="mt-2 leading-relaxed text-muted">{s.short}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page grid gap-10 pb-16 md:pb-20 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Eyebrow data-reveal>Our leadership</Eyebrow>
          <h2 data-reveal className="mt-6 text-3xl font-medium tracking-tight md:text-5xl">
            {company.leader.name}
          </h2>
          <p className="mt-2 text-muted">{company.leader.title}</p>
        </div>
        <div className="space-y-6 leading-relaxed text-ink/85 lg:col-span-6">
          {company.leader.bio.map((p) => (
            <p key={p.slice(0, 32)} data-reveal>
              {p}
            </p>
          ))}
          <ButtonLink href="/contact" variant="outline">
            Get in touch
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
