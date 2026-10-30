"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Declarative scroll motion for server-rendered markup:
 *  [data-reveal]     fade + rise when scrolled into view (batched, staggered)
 *  [data-speedline]  logo speed lines draw in from the left
 *  [data-parallax]   drifts against scroll by its value in px (e.g. data-parallax="40")
 *  [data-progress]   scales from 0→1 on the Y axis as its parent scrolls through
 * Everything is skipped under prefers-reduced-motion.
 */
export function MotionRoot() {
  const pathname = usePathname();

  useGSAP(
    () => {
      document.documentElement.classList.add("motion-ready");
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 88%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.07, overwrite: true }),
        });

        gsap.utils.toArray<HTMLElement>("[data-speedline]").forEach((el, i) => {
          gsap.from(el, {
            scaleX: 0,
            duration: 1.1,
            ease: "expo.out",
            delay: (i % 5) * 0.08,
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.to(el, {
            y: -Number(el.dataset.parallax || 40),
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-progress]").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top 70%", end: "bottom 60%", scrub: true },
            },
          );
        });
      });

      // Images and fonts shift layout after first paint.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      return () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
