import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

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
          <span data-speedline className="relative block origin-left" style={{ width: unit * 5.5, height: unit }}>
            <span className={`absolute inset-y-0 left-0 w-full rounded-full ${l.soft}`} />
            <span className={`absolute inset-y-0 right-0 w-[62%] rounded-full ${l.solid}`} />
          </span>
        </div>
      ))}
    </div>
  );
}
