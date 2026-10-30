import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { site } from "@/content/site";

export function Logo({ variant = "brand", className = "h-8 w-auto" }: { variant?: "brand" | "white"; className?: string }) {
  return (
    <Image
      src={variant === "white" ? "/logo-white.svg" : "/logo.svg"}
      alt="Ginerva"
      width={550}
      height={93}
      loading="eager"
      unoptimized
      className={className}
    />
  );
}

const buttonStyles = {
  primary: "bg-navy-700 text-white hover:bg-navy-800",
  mint: "bg-mint text-ink hover:bg-mint-soft",
  outline: "border border-navy-700/20 text-navy-700 hover:border-navy-700 hover:bg-white",
  "outline-dark": "border border-white/25 text-white hover:border-white hover:bg-white/5",
} as const;

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof buttonStyles }) {
  return (
    <Link
      {...props}
      className={`group inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-[0.95rem] font-medium transition-colors duration-200 active:translate-y-px ${buttonStyles[variant]} ${className}`}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
    </Link>
  );
}

export function Eyebrow({ children, className = "", ...props }: ComponentProps<"p">) {
  return (
    <p {...props} className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-navy-600 [.on-dark_&]:text-mint ${className}`}>
      <span aria-hidden className="flex gap-1">
        <span className="size-1.5 rounded-full bg-lavender" />
        <span className="size-1.5 rounded-full bg-mint" />
        <span className="size-1.5 rounded-full bg-ember" />
      </span>
      {children}
    </p>
  );
}

/** Heading with one italic serif accent word, e.g. accent="care." */
export function Display({
  as: Tag = "h2",
  children,
  accent,
  className = "",
}: {
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
  accent?: string;
  className?: string;
}) {
  return (
    <Tag className={`text-balance font-medium tracking-[-0.035em] ${className}`}>
      {children}
      {accent && (
        <>
          {" "}
          <span className="font-serif font-normal italic tracking-[-0.01em]">{accent}</span>
        </>
      )}
    </Tag>
  );
}

export function PageSkeleton() {
  return (
    <div aria-busy className="container-page min-h-[100dvh] pt-32">
      <div className="h-6 w-40 animate-pulse rounded-full bg-stage" />
      <div className="mt-6 h-14 w-full max-w-2xl animate-pulse rounded-2xl bg-stage" />
      <div className="mt-10 h-[420px] animate-pulse rounded-[var(--radius-stage)] bg-stage" />
    </div>
  );
}

/** The logo's five speed-line colours as one hairline band. */
export function BrandStripe({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex h-1 ${className}`}>
      <span className="flex-[3] bg-navy-600" />
      <span className="flex-[2] bg-lavender" />
      <span className="flex-[2] bg-mint" />
      <span className="flex-[1.5] bg-ember" />
      <span className="flex-1 bg-forest" />
    </div>
  );
}

// lucide-react v1 dropped brand marks; these are the Simple Icons glyphs (24×24).
const socialIcons: Record<string, ReactNode> = {
  linkedin: (
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  ),
  instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" />
    </g>
  ),
  youtube: (
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  ),
};

export function SocialLinks({ className = "", linkClassName = "" }: { className?: string; linkClassName?: string }) {
  return (
    <ul aria-label="Ginerva on social media" className={`flex items-center gap-1 ${className}`}>
      {site.socials.map((s) => (
        <li key={s.platform}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.label} (opens in a new tab)`}
            className={`grid size-11 place-items-center rounded-full transition-colors ${linkClassName}`}
          >
            <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
              {socialIcons[s.platform]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** The five speed lines from the Ginerva mark, used as a recurring motif. Animated by MotionRoot via [data-speedline]. */
const lines = [
  { solid: "bg-lavender", soft: "bg-lavender-soft", offset: 0 },
  { solid: "bg-mint", soft: "bg-mint-soft", offset: 1 },
  { solid: "bg-navy-700", soft: "bg-navy-200", offset: 2 },
  { solid: "bg-ember", soft: "bg-ember-soft", offset: 1 },
  { solid: "bg-forest", soft: "bg-forest-soft", offset: 0 },
];

export function SpeedLines({ className = "", unit = 14 }: { className?: string; unit?: number }) {
  return (
    <div aria-hidden className={`flex flex-col ${className}`} style={{ gap: unit * 0.5 }}>
      {lines.map((l, i) => (
        <div key={i} className="flex items-center" style={{ paddingLeft: l.offset * unit * 1.6, gap: unit * 0.45 }}>
          <span className={`shrink-0 rounded-full ${l.solid}`} style={{ width: unit, height: unit }} />
          {/* MotionRoot hydrates before streamed page content and writes the GSAP transform into this style first. */}
          <span data-speedline suppressHydrationWarning className="relative block origin-left" style={{ width: unit * 5.5, height: unit }}>
            <span className={`absolute inset-y-0 left-0 w-full rounded-full ${l.soft}`} />
            <span className={`absolute inset-y-0 right-0 w-[62%] rounded-full ${l.solid}`} />
          </span>
        </div>
      ))}
    </div>
  );
}
