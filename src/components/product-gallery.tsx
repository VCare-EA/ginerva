"use client";

import Image from "next/image";
import { useState, ViewTransition } from "react";
import type { Product } from "@/content/products";

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const image = product.images[active];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-[var(--radius-stage)] bg-stage">
        <ViewTransition name={`product-${product.slug}`} share="morph" default="none">
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            loading="eager"
            fetchPriority="high"
            className="product-shot p-8 md:p-14"
          />
        </ViewTransition>
      </div>
      {product.images.length > 1 && (
        <ul className="grid grid-cols-4 gap-3" aria-label="Product views">
          {product.images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show view ${i + 1}`}
                aria-current={i === active}
                className={`relative block aspect-square w-full cursor-pointer overflow-hidden rounded-2xl bg-stage transition-shadow duration-200 ${
                  i === active ? "ring-2 ring-navy-700" : "hover:ring-2 hover:ring-navy-200"
                }`}
              >
                <Image src={img.src} alt="" fill sizes="120px" className="product-shot p-2" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
