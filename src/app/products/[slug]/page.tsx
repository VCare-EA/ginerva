import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Check, ChevronRight } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { ButtonLink, Eyebrow, PageSkeleton } from "@/components/ui";
import { getProduct, productBadges, products, relatedProducts } from "@/content/products";
import { certifications, site, specialities } from "@/content/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.summary,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { images: [{ url: product.images[0].src, width: 1024, height: 1024, alt: product.images[0].alt }] },
    robots: product.draft ? { index: false, follow: true } : undefined,
  };
}

export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ProductDetail params={params} />
    </Suspense>
  );
}

async function ProductDetail({ params }: Pick<PageProps<"/products/[slug]">, "params">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const badges = productBadges(product);
  const speciality = specialities.find((s) => s.slug === product.speciality)!;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: product.images.map((i) => new URL(i.src, site.url).toString()),
    brand: { "@type": "Brand", name: product.brandLine },
    manufacturer: { "@type": "Organization", name: site.legalName, url: site.url },
    category: speciality.name,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <section className="container-page pb-20 pt-28 md:pt-28">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li className="flex items-center gap-1.5">
              <Link href="/products" className="hover:text-ink">
                Products
              </Link>
              <ChevronRight aria-hidden className="size-3.5" />
            </li>
            <li className="flex items-center gap-1.5">
              <Link href={`/specialities/${speciality.slug}`} className="hover:text-ink">
                {speciality.name}
              </Link>
              <ChevronRight aria-hidden className="size-3.5" />
            </li>
            <li aria-current="page" className="text-ink">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-28">
              <ProductGallery product={product} />
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.14em]">
              <span className="rounded-full bg-navy-50 px-3 py-1 text-navy-700">{product.brandLine}</span>
              <span className="rounded-full border border-line px-3 py-1 text-muted">{product.kind}</span>
            </p>
            <h1 className="mt-6 text-balance text-4xl font-medium tracking-[-0.035em] text-navy-950 md:text-5xl">{product.name}</h1>
            <p className="mt-4 font-serif text-2xl italic leading-snug text-navy-700">{product.tagline}</p>
            <p className="mt-6 leading-relaxed text-muted">{product.summary}</p>

            {(badges.length > 0 || product.madeInIndia) && (
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Registrations">
                {badges.map((id) => (
                  <li key={id} className="inline-flex items-center gap-1.5 rounded-full border border-mint bg-mint-soft/50 px-3 py-1.5 text-sm text-forest">
                    <Check aria-hidden className="size-4" />
                    {certifications[id].name} registered
                  </li>
                ))}
                {product.madeInIndia && (
                  <li className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm text-ink">Made in India</li>
                )}
              </ul>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="#enquire">Enquire about this product</ButtonLink>
            </div>

            {product.draft && (
              <p className="mt-8 rounded-2xl border border-dashed border-line p-5 text-sm text-muted">
                Full specifications for this product are being finalised. Contact our team for the current datasheet.
              </p>
            )}

            {product.body.length > 0 && (
              <div className="mt-10 space-y-5 border-t border-line pt-10 leading-relaxed text-ink/85">
                {product.body.map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
              </div>
            )}

            {product.specs.length > 0 && (
              <div className="mt-10">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy-600">Specifications</h2>
                <dl className="mt-4 divide-y divide-line border-y border-line">
                  {product.specs.map((s) => (
                    <div key={s.label} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 py-3.5 text-sm">
                      <dt className="text-muted">{s.label}</dt>
                      <dd className="text-ink">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {product.areas.length > 0 && (
              <div className="mt-10">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy-600">Treatment areas</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {product.areas.map((a) => (
                    <li key={a} className="rounded-full bg-stage px-3.5 py-1.5 text-sm text-ink">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.idealFor.length > 0 && (
              <p className="mt-10 text-sm text-muted">
                <span className="font-medium text-ink">Ideal for:</span> {product.idealFor.join(", ")}
              </p>
            )}
          </div>
        </div>
      </section>

      {product.features.length > 0 && (
        <section aria-labelledby="features-heading" className="bg-white py-20 md:py-20">
          <div className="container-page">
            <Eyebrow>Why practitioners choose it</Eyebrow>
            <h2 id="features-heading" className="sr-only">
              Key features
            </h2>
            <ol className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
              {product.features.map((f, i) => (
                <li key={f.title} data-reveal className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line pt-6">
                  <span className="font-mono text-sm text-navy-600">0{i + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium tracking-tight">{f.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{f.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section id="enquire" aria-labelledby="enquire-heading" className="scroll-mt-24 py-20 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Enquire</Eyebrow>
            <h2 id="enquire-heading" className="mt-5 text-3xl font-medium tracking-tight md:text-4xl">
              Pricing, demos and datasheets for <span className="font-serif font-normal italic">{product.name}</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              For use by trained medical professionals. Individual results vary. Read our{" "}
              <Link href="/legal/medical-disclaimer" className="underline underline-offset-4">
                medical disclaimer
              </Link>
              .
            </p>
          </div>
          <div className="rounded-[var(--radius-stage)] border border-line bg-white p-6 shadow-card md:p-10 lg:col-span-8">
            <EnquiryForm product={product.slug} compact />
          </div>
        </div>
      </section>

      <section aria-labelledby="related-heading" className="container-page pb-16 md:pb-20">
        <h2 id="related-heading" className="text-2xl font-medium tracking-tight md:text-3xl">
          Related products
        </h2>
        <ul className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {relatedProducts(product).map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
