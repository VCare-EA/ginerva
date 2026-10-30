"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties, type ReactNode } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export type HeroSlide = {
  slug: string;
  name: string;
  brand: string;
  label: string;
  tagline: string;
  image: { src: string; alt: string };
  /** Transparent cutout (gets a drop shadow). Photos on white use multiply instead, where a shadow would outline the frame. */
  cutout?: boolean;
};

// Wash, shape and accent colours per slide, all from the logo's speed lines.
const themes = [
  { wash: "#c0bbff", shape: "#132474", accent: "#47ffbf" },
  { wash: "#8ff5cf", shape: "#133700", accent: "#132474" },
  { wash: "#e8a98c", shape: "#c43b00", accent: "#132474" },
  { wash: "#a7b0e0", shape: "#132474", accent: "#c0bbff" },
  { wash: "#b9c9ad", shape: "#133700", accent: "#c43b00" },
];

const enter = "transition duration-1000 ease-[var(--ease-out-expo)] group-data-[active=true]:opacity-100";

/**
 * Full-bleed product carousel. The active progress bar's CSS animation is the autoplay timer: its `animationend`
 * advances the slide, pausing is `animation-play-state`, and under reduced motion the bar never animates, so the
 * carousel never auto-advances. Nothing here creates a stacking context between product photos and the washes,
 * so the multiply blend on photos shot on white keeps working.
 */
export function HeroSlider({ slides, children }: { slides: HeroSlide[]; children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (step: number) => setIndex((i) => (i + step + slides.length) % slides.length);

  return (
    <section aria-roledescription="carousel" aria-label="Featured Ginerva devices" className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        {slides.map((s, i) => (
          <div
            key={s.slug}
            className={`hero-wash absolute inset-0 transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
            style={{ "--wash": themes[i % themes.length].wash } as CSSProperties}
          />
        ))}
      </div>

      <div className="container-page grid gap-8 pb-8 pt-24 md:pt-28 lg:min-h-[min(100dvh,860px)] lg:grid-cols-12 lg:items-center lg:gap-6">
        <div className="lg:col-span-6">{children}</div>

        <div className="flex flex-col lg:col-span-6 lg:self-stretch">
          <div aria-live={paused ? "polite" : "off"} className="relative h-[360px] sm:h-[460px] lg:h-auto lg:min-h-[520px] lg:flex-1">
            {slides.map((s, i) => {
              const t = themes[i % themes.length];
              const active = i === index;
              return (
                <div
                  key={s.slug}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${slides.length}: ${s.name}`}
                  data-active={active}
                  inert={!active}
                  className={`group absolute inset-0 transition-[visibility] duration-1000 ${active ? "visible" : "invisible"}`}
                >
                  <span
                    aria-hidden
                    className={`absolute left-0 top-0 -translate-x-6 text-[clamp(3rem,5.5vw,5rem)] font-semibold leading-none tracking-tighter text-transparent opacity-0 [-webkit-text-stroke:1.5px_var(--stroke)] ${enter} group-data-[active=true]:translate-x-0`}
                    style={{ "--stroke": `color-mix(in srgb, ${t.shape} 45%, transparent)` } as CSSProperties}
                  >
                    {s.brand}
                  </span>

                  <span
                    aria-hidden
                    className={`absolute inset-x-[12%] bottom-0 h-[86%] origin-bottom scale-y-75 rounded-t-full bg-white/55 opacity-0 ${enter} group-data-[active=true]:scale-y-100`}
                  />
                  <span
                    aria-hidden
                    className={`absolute right-[2%] top-[4%] scale-50 opacity-0 ${enter} group-data-[active=true]:scale-100 group-data-[active=true]:delay-200`}
                  >
                    <span
                      className="block size-24 rounded-full border-[10px] motion-safe:animate-[spin_36s_linear_infinite] md:size-36 md:border-[14px]"
                      style={{ borderColor: t.accent, borderBottomColor: "transparent" }}
                    />
                  </span>
                  <span
                    aria-hidden
                    className={`absolute left-[6%] top-[30%] opacity-0 ${enter} group-data-[active=true]:delay-300`}
                  >
                    <span className="block size-10 rounded-full motion-safe:animate-[float_7s_ease-in-out_infinite] md:size-14" style={{ background: t.shape }} />
                  </span>
                  <span
                    aria-hidden
                    className={`absolute right-[3%] top-[40%] size-14 rotate-45 rounded-xl border-2 opacity-0 md:size-20 ${enter} group-data-[active=true]:rotate-12 group-data-[active=true]:delay-300`}
                    style={{ borderColor: t.shape }}
                  />
                  <span
                    aria-hidden
                    className={`absolute bottom-0 left-[2%] h-12 w-24 translate-y-full rounded-t-full opacity-0 md:h-16 md:w-32 ${enter} group-data-[active=true]:translate-y-0 group-data-[active=true]:delay-150`}
                    style={{ background: t.accent }}
                  />

                  <div className="absolute inset-x-[10%] bottom-[15%] top-[6%]">
                    <Image
                      src={s.image.src}
                      alt={s.image.alt}
                      fill
                      sizes="(min-width: 1024px) 38vw, 80vw"
                      loading={i === 0 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : "auto"}
                      className={`product-shot object-bottom translate-x-[8%] opacity-0 ${enter} group-data-[active=true]:translate-x-0 group-data-[active=true]:delay-100 ${
                        s.cutout ? "drop-shadow-[0_34px_30px_rgba(11,18,51,0.25)]" : ""
                      }`}
                    />
                  </div>

                  <div
                    className={`absolute -bottom-12 -right-1 w-[min(320px,82%)] translate-y-4 rounded-2xl border border-white/50 bg-[linear-gradient(135deg,rgb(255_255_255/0.42),rgb(255_255_255/0.1))] p-4 opacity-0 shadow-[inset_0_1px_0_rgb(255_255_255/0.7),0_24px_48px_-24px_rgb(11_18_51/0.35)] backdrop-blur-md backdrop-saturate-150 md:p-5 lg:-right-6 ${enter} group-data-[active=true]:translate-y-0 group-data-[active=true]:delay-500`}
                  >
                    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: t.shape }}>
                      <span aria-hidden className="size-1.5 rounded-full" style={{ background: t.shape }} />
                      {s.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold leading-snug tracking-tight text-navy-950">{s.name}</p>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-navy-900/85">{s.tagline}</p>
                    <Link
                      href={`/products/${s.slug}`}
                      className="group/link -mb-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-navy-800 underline decoration-navy-800/30 underline-offset-4 hover:decoration-navy-800"
                    >
                      View device
                      <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 flex items-center gap-2">
            <SlideButton label="Previous device" onClick={() => go(-1)}>
              <ChevronLeft className="size-5" />
            </SlideButton>
            <SlideButton label="Next device" onClick={() => go(1)}>
              <ChevronRight className="size-5" />
            </SlideButton>
            <SlideButton
              label={paused ? "Play slideshow" : "Pause slideshow"}
              onClick={() => setPaused((p) => !p)}
              className="motion-reduce:hidden"
            >
              {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
            </SlideButton>
            <ol className="ml-3 flex flex-1 gap-2">
              {slides.map((s, i) => (
                <li key={s.slug} className="flex-1">
                  <button
                    type="button"
                    aria-label={`Show ${s.name}`}
                    aria-current={i === index ? "true" : undefined}
                    onClick={() => setIndex(i)}
                    className="flex min-h-11 w-full cursor-pointer flex-col justify-center gap-1.5 text-left"
                  >
                    <span className="relative block h-1 overflow-hidden rounded-full bg-navy-900/12">
                      {i === index && (
                        <span
                          key={index}
                          className="absolute inset-0 origin-left motion-safe:animate-[slide-progress_6s_linear_forwards]"
                          style={{ background: themes[i % themes.length].shape, animationPlayState: paused ? "paused" : "running" }}
                          onAnimationEnd={() => go(1)}
                        />
                      )}
                    </span>
                    <span
                      className={`truncate text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${i === index ? "text-navy-950" : "text-navy-900/55"}`}
                    >
                      {s.brand}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function SlideButton({ label, onClick, className = "", children }: { label: string; onClick: () => void; className?: string; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-navy-900/15 bg-white/70 text-navy-700 backdrop-blur transition-colors hover:border-navy-700 hover:bg-white active:translate-y-px ${className}`}
    >
      {children}
    </button>
  );
}
