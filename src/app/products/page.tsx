import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { ProductExplorer, ProductExplorerFromUrl } from "@/components/product-explorer";
import { products } from "@/content/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Aesthetic devices, kits and formulations from Ginerva: diode laser, ExoSmart, Skynis, Maxx and VeAge.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero eyebrow="Products" title="Devices and kits for" accent="modern clinics.">
        {products.length} products across the Ginerva, Skynis, ExoSmart, Maxx and VeAge lines. Filter by the concern your
        patients bring in, or by brand.
      </PageHero>
      <section className="container-page pb-16 md:pb-20">
        <Suspense fallback={<ProductExplorer morph />}>
          <ProductExplorerFromUrl />
        </Suspense>
      </section>
    </>
  );
}
