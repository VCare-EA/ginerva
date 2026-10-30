import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { site, specialities } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/products",
    "/quality",
    "/private-label",
    "/contact",
    ...specialities.map((s) => `/specialities/${s.slug}`),
    ...products.filter((p) => !p.draft).map((p) => `/products/${p.slug}`),
    "/legal/privacy",
    "/legal/terms",
    "/legal/medical-disclaimer",
  ];
  return paths.map((p) => ({ url: `${site.url}${p}` }));
}
