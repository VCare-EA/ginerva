"use client";

import gsap from "gsap";
import { Flip } from "gsap/Flip";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { concerns, products, type Concern, type Product } from "@/content/products";
import { ProductCard } from "./product-card";

gsap.registerPlugin(Flip);

const brandLines = [...new Set(products.map((p) => p.brandLine))];
const isConcern = (v: string | null): v is Concern => !!v && v in concerns;

type Filter = { concern: Concern | null; brand: Product["brandLine"] | null };

export function ProductExplorer({
  initial = { concern: null, brand: null },
  syncUrl = false,
  showBrands = true,
  morph = false,
  limit,
}: {
  initial?: Filter;
  syncUrl?: boolean;
  showBrands?: boolean;
  morph?: boolean;
  /** Show at most this many matches and link to the full catalogue for the rest. */
  limit?: number;
}) {
  const [filter, setFilter] = useState<Filter>(initial);
  const grid = useRef<HTMLUListElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const matches = (p: Product) =>
    (!filter.concern || p.concerns.includes(filter.concern)) && (!filter.brand || p.brandLine === filter.brand);
  const matched = products.filter(matches);
  const count = matched.length;
  const visible = new Set(matched.slice(0, limit ?? count).map((p) => p.slug));
  const catalogueHref = filter.concern ? `/products?concern=${filter.concern}` : "/products";

  const update = (next: Filter) => {
    if (grid.current && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      flipState.current = Flip.getState(grid.current.children);
    }
    setFilter(next);
    if (syncUrl) {
      const qs = new URLSearchParams();
      if (next.concern) qs.set("concern", next.concern);
      if (next.brand) qs.set("brand", next.brand);
      history.replaceState(null, "", qs.size ? `?${qs}` : location.pathname);
    }
  };

  useLayoutEffect(() => {
    if (!flipState.current) return;
    Flip.from(flipState.current, {
      duration: 0.6,
      ease: "expo.out",
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.5 }),
    });
    flipState.current = null;
  }, [filter]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <ChipGroup label="Filter by concern">
          <Chip pressed={!filter.concern} onClick={() => update({ ...filter, concern: null })}>
            All concerns
          </Chip>
          {(Object.keys(concerns) as Concern[]).map((c) => (
            <Chip key={c} pressed={filter.concern === c} onClick={() => update({ ...filter, concern: c })} title={concerns[c].hint}>
              {concerns[c].label}
            </Chip>
          ))}
        </ChipGroup>
        {showBrands && (
          <ChipGroup label="Filter by brand line">
            <Chip pressed={!filter.brand} onClick={() => update({ ...filter, brand: null })} subtle>
              All brands
            </Chip>
            {brandLines.map((b) => (
              <Chip key={b} pressed={filter.brand === b} onClick={() => update({ ...filter, brand: b })} subtle>
                {b}
              </Chip>
            ))}
          </ChipGroup>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 text-sm">
        <p aria-live="polite" className="text-muted">
          {count} {count === 1 ? "product" : "products"} {limit && count > limit ? "match" : "shown"}
        </p>
        {limit && count > limit && (
          <Link href={catalogueHref} className="inline-flex min-h-11 items-center font-medium text-navy-700 underline underline-offset-4">
            See all {count}
          </Link>
        )}
      </div>

      <ul
        ref={grid}
        className={`mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 ${limit ? "lg:grid-cols-4" : "2xl:grid-cols-4"}`}
      >
        {products.map((p) => (
          <li key={p.slug} data-flip-id={p.slug} className={visible.has(p.slug) ? "" : "hidden"}>
            <ProductCard product={p} morph={morph} />
          </li>
        ))}
      </ul>

      {count === 0 && (
        <div className="rounded-[var(--radius-stage)] border border-dashed border-line p-10 text-center">
          <p className="font-medium">No products match that combination.</p>
          <p className="mt-1 text-sm text-muted">
            Tell us what you need on the{" "}
            <Link href="/contact" className="text-navy-700 underline underline-offset-4">
              contact page
            </Link>{" "}
            — we may already be building it.
          </p>
        </div>
      )}
    </div>
  );
}

/** Reads the initial filter from ?concern=&brand=. Must render inside <Suspense>. */
export function ProductExplorerFromUrl() {
  const params = useSearchParams();
  const concern = params.get("concern");
  const brand = params.get("brand");
  return (
    <ProductExplorer
      syncUrl
      morph
      initial={{
        concern: isConcern(concern) ? concern : null,
        brand: brandLines.find((b) => b === brand) ?? null,
      }}
    />
  );
}

function ChipGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {children}
    </div>
  );
}

function Chip({
  pressed,
  subtle,
  children,
  ...props
}: { pressed: boolean; subtle?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      {...props}
      className={`min-h-11 cursor-pointer rounded-full border px-5 text-sm transition-colors duration-200 ${
        pressed
          ? subtle
            ? "border-navy-700 bg-navy-50 text-navy-700"
            : "border-navy-700 bg-navy-700 text-white"
          : "border-line bg-white text-muted hover:border-navy-200 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
