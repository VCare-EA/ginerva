import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ClipboardCheck, Factory, ShieldCheck } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { FeaturedRail } from "@/components/featured-rail";
import { HeroSlider, type HeroSlide } from "@/components/hero-slider";
import { ProductExplorer } from "@/components/product-explorer";
import { CertificationStrip } from "@/components/certification-strip";
import { BrandStripe, ButtonLink, Display, Eyebrow, SpeedLines } from "@/components/ui";
import { featuredProducts, products } from "@/content/products";
import { company, qualitySteps, site, specialities } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero />
      <CertificationStrip />
      <Intro />
      <SpecialityBento />
      <FeaturedRail
        products={featuredProducts}
        intro={
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>Featured devices</Eyebrow>
              <Display as="h2" accent="practitioners trust." className="mt-5 max-w-2xl text-4xl md:text-5xl">
                <span id="featured-heading">Equipment</span>
              </Display>
            </div>
            <ButtonLink href="/products" variant="outline">
              View all {products.length} products
            </ButtonLink>
          </div>
        }
      />
      <Indications />
      <Quality />
      <Leadership />
      <PrivateLabel />
      <ContactBand />
    </>
  );
}

function Hero() {
  return (
    <HeroSlider slides={heroSlides}>
      <Eyebrow>ISO 13485 certified · Made in India</Eyebrow>
      <Display as="h1" accent="care." className="mt-5 text-[clamp(2.4rem,4.4vw,4.25rem)] leading-[1] text-navy-950">
        Precision medical devices, built with the same
      </Display>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
        Ginerva assembles and manufactures aesthetic, orthopaedic and dental devices in a cleanroom-equipped facility in
        Puducherry — for the professionals who care for patients every day.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <ButtonLink href="/products">Explore products</ButtonLink>
        <ButtonLink href="/private-label" variant="outline">
          Partner with us
        </ButtonLink>
      </div>
      <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-navy-900/10 pt-5 text-sm">
        {[
          ["3", "specialities", "text-navy-700"],
          [String(products.length), "products", "text-ember"],
          [String(site.addresses.length), "sites: Puducherry & Chennai", "text-forest"],
        ].map(([value, label, color]) => (
          <div key={label}>
            <dt className="sr-only">{label}</dt>
            <dd className={`text-3xl font-medium tracking-tight ${color}`}>{value}</dd>
            <dd className="mt-1 text-muted">{label}</dd>
          </div>
        ))}
      </dl>
    </HeroSlider>
  );
}

const heroSlides: HeroSlide[] = featuredProducts.map((p) => ({
  slug: p.slug,
  name: p.name,
  brand: p.brandLine,
  label: `${p.brandLine} · ${p.kind}`,
  tagline: p.tagline,
  ...(p.slug === "diode-laser-hair-removal"
    ? { image: { src: "/hero-device.webp", alt: "Ginerva 808 nm diode laser hair removal system" }, cutout: true }
    : { image: p.images[0] }),
}));

function Intro() {
  return (
    <section className="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <Eyebrow data-reveal>About Ginerva</Eyebrow>
        <p data-reveal className="mt-8 text-balance text-3xl font-medium leading-[1.15] tracking-[-0.03em] text-navy-950 md:text-5xl">
          The professionals who care for patients every day deserve devices built with{" "}
          <span className="font-serif font-normal italic">the same care</span> they give.
        </p>
        <p data-reveal className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          {company.story[0]}
        </p>
        <Link
          data-reveal
          href="/about"
          className="mt-8 inline-flex items-center gap-2 font-medium text-navy-700 underline decoration-navy-200 underline-offset-[6px] hover:decoration-navy-700"
        >
          Our story <ArrowUpRight aria-hidden className="size-4" />
        </Link>
      </div>
      <div className="flex items-center justify-center lg:col-span-4 lg:justify-end">
        <SpeedLines unit={26} />
      </div>
    </section>
  );
}

function SpecialityBento() {
  const [aesthetic, ...soon] = specialities;
  return (
    <section aria-labelledby="specialities-heading" className="container-page pb-16 md:pb-20">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Eyebrow data-reveal>What we do</Eyebrow>
          <Display as="h2" accent="shape outcomes." className="mt-5 max-w-3xl text-4xl md:text-5xl">
            <span id="specialities-heading">Three specialities where precision and hygiene</span>
          </Display>
        </div>
        <p className="max-w-sm text-muted">{company.whatWeDo}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
        <Link
          href={`/specialities/${aesthetic.slug}`}
          data-reveal
          className="group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[var(--radius-stage)] bg-lavender-soft p-8 md:col-span-2 md:row-span-2 md:min-h-[600px] md:p-12"
        >
          <div className="relative z-10 max-w-md">
            <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-navy-700">Where Ginerva began</span>
            <h3 className="mt-6 text-3xl font-medium tracking-tight text-navy-950 md:text-5xl">{aesthetic.name}</h3>
            <p className="mt-4 text-navy-900/75">{aesthetic.short}</p>
          </div>
          <span className="relative z-10 inline-flex items-center gap-2 font-medium text-navy-700">
            Explore the range <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
          <div className="absolute -bottom-6 right-0 h-[72%] w-[62%] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-3">
            <Image
              src="/products/skynis-needleless-mesotherapy/1.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 40vw, 60vw"
              className="product-shot object-bottom"
            />
          </div>
        </Link>
        {soon.map((s) => (
          <Link
            key={s.slug}
            href={`/specialities/${s.slug}`}
            data-reveal
            className="group relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-[var(--radius-stage)] p-8"
            style={{ background: `color-mix(in srgb, ${s.accent} 16%, white)` }}
          >
            <span
              aria-hidden
              className="absolute right-7 top-7 size-20 rounded-full border-[10px] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-180"
              style={{ borderColor: s.accent, borderBottomColor: "transparent" }}
            />
            <span className="relative w-fit rounded-full bg-white/80 px-3 py-1 text-xs text-muted">In development</span>
            <div className="relative">
              <h3 className="text-2xl font-medium tracking-tight">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.short}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Indications() {
  return (
    <section
      aria-labelledby="indications-heading"
      className="bg-[linear-gradient(180deg,var(--color-navy-50),var(--color-lavender-soft))] py-16 md:py-20"
    >
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow data-reveal>Indications</Eyebrow>
            <Display as="h2" accent="asking for?" className="mt-5 text-4xl md:text-5xl">
              <span id="indications-heading">What are your patients</span>
            </Display>
          </div>
          <p className="text-muted lg:col-span-4 lg:col-start-9">
            Start from the concern, not the catalogue. Pick one to see the Ginerva devices and kits designed around it.
          </p>
        </div>
        <div className="mt-10">
          <ProductExplorer showBrands={false} limit={4} />
        </div>
      </div>
    </section>
  );
}

const qualityPoints = [
  { Icon: ShieldCheck, text: "ISO 13485:2016 quality management system" },
  { Icon: Factory, text: "Controlled cleanroom manufacturing in Puducherry" },
  { Icon: ClipboardCheck, text: "Indian MDR 2017 and applicable international standards" },
];

const stepColors = ["var(--color-mint)", "var(--color-lavender)", "var(--color-ember-soft)", "var(--color-mint-soft)"];

function Quality() {
  return (
    <section aria-labelledby="quality-heading" className="on-dark bg-navy-950 py-16 text-white md:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <Eyebrow>Our commitment to quality</Eyebrow>
          <Display as="h2" accent="not checked at the end." className="mt-6 text-4xl md:text-5xl">
            <span id="quality-heading">Built into every step,</span>
          </Display>
          <p className="mt-6 max-w-md leading-relaxed text-white/70">{company.quality}</p>
          <ul className="mt-10 grid gap-4 text-sm text-white/80">
            {qualityPoints.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <Icon aria-hidden className="size-5 shrink-0 text-mint" />
                {text}
              </li>
            ))}
          </ul>
          <ButtonLink href="/quality" variant="outline-dark" className="mt-10">
            Read our quality policy
          </ButtonLink>
        </div>

        <ol className="relative lg:col-span-6 lg:col-start-7">
          <span aria-hidden className="absolute bottom-0 left-[1.15rem] top-0 w-px bg-white/10" />
          <span aria-hidden data-progress suppressHydrationWarning className="absolute bottom-0 left-[1.15rem] top-0 w-px origin-top bg-mint" />
          {qualitySteps.map((step, i) => (
            <li key={step.title} data-reveal className="relative pb-16 pl-16 last:pb-0">
              <span
                className="absolute left-0 top-0 grid size-[2.35rem] place-items-center rounded-full font-mono text-xs font-semibold text-ink"
                style={{ background: stepColors[i % stepColors.length] }}
              >
                0{i + 1}
              </span>
              <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{step.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-white/65">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Leadership() {
  const { leader } = company;
  return (
    <section aria-labelledby="leadership-heading" className="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-4">
        <div data-reveal className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[var(--radius-stage)] bg-navy-950 p-8">
          <Image
            src="/leader-placeholder.jpg"
            alt={`Portrait of ${leader.name}`}
            fill
            sizes="(min-width: 1024px) 384px, 90vw"
            className="object-cover object-top"
          />
          <SpeedLines unit={14} className="relative" />
        </div>
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        <Eyebrow data-reveal>Our leadership</Eyebrow>
        <h2 id="leadership-heading" data-reveal className="mt-6 text-3xl font-medium tracking-tight md:text-5xl">
          {leader.name}
        </h2>
        <p data-reveal className="mt-2 text-muted">
          {leader.title} · Trichologist & entrepreneur
        </p>
        <p data-reveal className="mt-8 text-xl leading-relaxed text-navy-950 md:text-2xl">
          {leader.bio[0]}
        </p>
        <p data-reveal className="mt-6 leading-relaxed text-muted">
          {leader.bio[1]}
        </p>
      </div>
    </section>
  );
}

function PrivateLabel() {
  return (
    <section className="px-3 md:px-5">
      <div className="relative mx-auto grid max-w-[1440px] gap-10 overflow-hidden rounded-[2rem] bg-mint-soft/45 px-6 py-16 md:grid-cols-12 md:px-16 md:py-24">
        <div className="md:col-span-7">
          <Eyebrow data-reveal className="text-forest!">Private label manufacturing</Eyebrow>
          <Display as="h2" accent="Our cleanroom." className="mt-6 text-4xl text-navy-950 md:text-6xl">
            Your brand.
          </Display>
        </div>
        <div className="flex flex-col justify-end gap-8 md:col-span-5">
          <p className="text-lg leading-relaxed text-navy-900/80">{company.privateLabel}</p>
          <ButtonLink href="/private-label" className="w-fit">
            Talk to us about private label
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function ContactBand() {
  return (
    <section aria-labelledby="contact-heading" className="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Eyebrow data-reveal>Enquiries</Eyebrow>
        <Display as="h2" accent="right device." className="mt-6 text-4xl md:text-5xl">
          <span id="contact-heading">Let&apos;s find the</span>
        </Display>
        <p className="mt-6 max-w-md leading-relaxed text-muted">
          Clinics, hospitals, distributors and private-label partners — tell us what you need and our team will get back to you.
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-8 inline-block text-xl font-medium text-navy-700 underline decoration-mint decoration-2 underline-offset-[6px]"
        >
          {site.email}
        </a>
      </div>
      <div className="relative overflow-hidden rounded-[var(--radius-stage)] border border-line bg-white p-6 pt-8 shadow-card md:p-10 lg:col-span-7">
        <BrandStripe className="absolute inset-x-0 top-0" />
        <EnquiryForm />
      </div>
    </section>
  );
}
