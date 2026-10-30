import type { CSSProperties, ReactNode } from "react";
import { Display, Eyebrow, SpeedLines } from "./ui";

/** Inner-page header: left-aligned title, speed-line motif bleeding off the right edge. */
export function PageHero({
  eyebrow,
  title,
  accent,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  children?: ReactNode;
}) {
  return (
    <section
      className="hero-wash relative overflow-hidden pb-16 pt-28 md:pb-20 md:pt-32"
      style={{ "--wash": "var(--color-lavender-soft)" } as CSSProperties}
    >
      <span aria-hidden className="absolute -bottom-24 right-[18%] hidden size-72 rounded-t-full bg-white/50 lg:block" />
      <span
        aria-hidden
        className="absolute right-[6%] top-24 hidden size-28 rounded-full border-[12px] border-mint border-b-transparent motion-safe:animate-[spin_40s_linear_infinite] lg:block"
      />
      <SpeedLines unit={22} className="pointer-events-none absolute -right-24 top-44 hidden opacity-70 lg:flex" />
      <div className="container-page relative">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display as="h1" accent={accent} className="mt-6 max-w-4xl text-5xl leading-[0.98] text-navy-950 md:text-6xl">
          {title}
        </Display>
        {children && <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{children}</p>}
      </div>
    </section>
  );
}
