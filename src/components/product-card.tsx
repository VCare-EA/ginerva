import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowUpRight } from "lucide-react";
import { concerns, type Product } from "@/content/products";

/** `morph` names the image for the card→detail view transition. Only one card per product per page may set it. */
export function ProductCard({ product, morph = false, sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" }: {
  product: Product;
  morph?: boolean;
  sizes?: string;
}) {
  const image = (
    <Image
      src={product.images[0].src}
      alt={product.images[0].alt}
      fill
      sizes={sizes}
      className="product-shot p-6 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:scale-[1.03]"
    />
  );

  return (
    <Link href={`/products/${product.slug}`} className="group block cursor-pointer">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-stage)] bg-stage transition-shadow duration-500 group-hover:shadow-stage">
        {morph ? (
          <ViewTransition name={`product-${product.slug}`} share="morph" default="none">
            {image}
          </ViewTransition>
        ) : (
          image
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-navy-700 backdrop-blur">
          {product.brandLine}
        </span>
        <span
          aria-hidden
          className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-white text-navy-700 opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <div className="mt-4 px-1">
        <h3 className="text-lg font-medium tracking-tight text-ink">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{product.tagline}</p>
        <p className="mt-3 flex flex-wrap gap-1.5">
          {product.concerns.map((c) => (
            <span key={c} className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-muted">
              {concerns[c].label}
            </span>
          ))}
        </p>
      </div>
    </Link>
  );
}
