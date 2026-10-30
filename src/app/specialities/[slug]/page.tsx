import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { Eyebrow, PageSkeleton } from "@/components/ui";
import { products } from "@/content/products";
import { specialities } from "@/content/site";

const find = (slug: string) => specialities.find((s) => s.slug === slug);

export function generateStaticParams() {
  return specialities.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/specialities/[slug]">): Promise<Metadata> {
  const s = find((await params).slug);
  return s ? { title: s.name, description: s.short, alternates: { canonical: `/specialities/${s.slug}` } } : {};
}

export default function SpecialityPage({ params }: PageProps<"/specialities/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <SpecialityDetail params={params} />
    </Suspense>
  );
}

async function SpecialityDetail({ params }: Pick<PageProps<"/specialities/[slug]">, "params">) {
  const s = find((await params).slug);
  if (!s) notFound();

  const range = products.filter((p) => p.speciality === s.slug);
  const [lead, ...rest] = s.name.split(" ");

  return (
    <>
      <PageHero eyebrow={s.status === "active" ? "Speciality" : "Speciality · In development"} title={lead} accent={rest.join(" ")}>
        {s.body}
      </PageHero>

      {s.status === "active" ? (
        <section aria-label={`${s.name} range`} className="container-page pb-16 md:pb-20">
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {range.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} morph />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section aria-labelledby="interest-heading" className="container-page grid gap-10 pb-16 md:pb-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span aria-hidden className="block h-1.5 w-24 rounded-full" style={{ background: s.accent }} />
            <Eyebrow className="mt-8">Register interest</Eyebrow>
            <h2 id="interest-heading" className="mt-5 text-3xl font-medium tracking-tight">
              Be first to hear when the range launches.
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Tell us what your practice or laboratory needs. Early conversations help us shape what we build.
            </p>
          </div>
          <div className="rounded-[var(--radius-stage)] border border-line bg-white p-6 shadow-card md:p-10 lg:col-span-8">
            <EnquiryForm topic={`Register interest: ${s.name}`} compact />
          </div>
        </section>
      )}
    </>
  );
}
