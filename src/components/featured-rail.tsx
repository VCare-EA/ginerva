"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { Product } from "@/content/products";
import { ProductCard } from "./product-card";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Pinned horizontal product rail on desktop; native snap-scrolling everywhere else. */
export function FeaturedRail({ products, intro }: { products: Product[]; intro: React.ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => {
          const vp = viewport.current!;
          const cs = getComputedStyle(vp);
          return track.current!.scrollWidth - (vp.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight));
        };
        gsap.set(viewport.current, { overflow: "hidden" });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        tl.to(track.current, { x: () => -distance(), ease: "none" }, 0).fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
      });
    },
    { scope: section },
  );

  return (
    <section ref={section} aria-labelledby="featured-heading" className="flex min-h-dvh flex-col justify-center overflow-hidden py-16 lg:py-20">
      <div className="container-page">{intro}</div>
      <div
        ref={viewport}
        className="bleed-page mt-10 overflow-x-auto pb-4 [scrollbar-width:thin]"
      >
        <ul ref={track} className="flex w-max snap-x snap-mandatory gap-6">
          {products.map((p) => (
            <li key={p.slug} className="w-[78vw] shrink-0 snap-start sm:w-[340px] lg:w-[380px]">
              <ProductCard product={p} morph sizes="(min-width: 1024px) 380px, (min-width: 640px) 340px, 78vw" />
            </li>
          ))}
        </ul>
      </div>
      <div className="container-page mt-8 hidden lg:block" aria-hidden>
        <div className="h-px w-full bg-line">
          <span ref={bar} className="block h-px origin-left scale-x-0 bg-navy-700" />
        </div>
      </div>
    </section>
  );
}
