"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { featuredProducts } from "@/content/products";
import { nav, specialities } from "@/content/site";
import { BrandStripe, Logo, SocialLinks } from "./ui";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [farDown, setFarDown] = useState(false);
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Close the mobile menu when navigation happens (adjusting state during render, not in an effect).
  if (open && openedAt !== pathname) setOpen(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      setFarDown(window.scrollY > window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-3 top-3 z-40 md:inset-x-5">
      <div
        className={`on-dark relative mx-auto flex h-16 max-w-[1360px] items-center justify-between overflow-visible rounded-2xl px-4 text-white backdrop-blur-xl transition-[background-color,box-shadow] duration-300 md:px-6 ${
          scrolled || open
            ? "bg-navy-950/95 shadow-[0_18px_40px_-18px_rgb(7_14_46/0.65)]"
            : "bg-[linear-gradient(100deg,var(--color-navy-950),var(--color-navy-700))] shadow-[0_14px_34px_-20px_rgb(7_14_46/0.6)]"
        }`}
      >
        <BrandStripe className="absolute inset-x-5 bottom-0 overflow-hidden rounded-full" />
        <Link href="/" aria-label="Ginerva — home" className="shrink-0">
          <Logo variant="white" className="h-7 w-auto md:h-8" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) =>
              item.href === "/products" ? (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`${navLink} flex items-center gap-1 ${isActive(item.href) ? navActive : "text-white/75"}`}
                  >
                    {item.label}
                    <ChevronDown aria-hidden className="size-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                  </Link>
                  <MegaMenu />
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`${navLink} block ${isActive(item.href) ? navActive : "text-white/75"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <SocialLinks className="hidden xl:flex" linkClassName="text-white/70 hover:bg-white/10 hover:text-white" />
          <Link
            href="/contact"
            className="hidden min-h-11 items-center rounded-full bg-mint px-5 text-sm font-semibold text-ink transition-colors hover:bg-mint-soft active:translate-y-px sm:inline-flex"
          >
            Enquire now
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpenedAt(pathname);
              setOpen((v) => !v);
            }}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 cursor-pointer place-items-center rounded-full text-white hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="mx-auto mt-2 max-h-[calc(100dvh-6rem)] max-w-[1360px] overflow-y-auto rounded-2xl border border-line bg-white p-4 shadow-card lg:hidden"
        >
          <ul className="divide-y divide-line">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex min-h-14 items-center justify-between text-lg font-medium tracking-tight text-ink"
                >
                  {item.label}
                  <ArrowUpRight aria-hidden className="size-4 text-muted" />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="mt-4 flex min-h-12 items-center justify-center rounded-full bg-navy-700 font-medium text-white"
          >
            Enquire now
          </Link>
          <SocialLinks className="mt-3 justify-center" linkClassName="text-navy-700 hover:bg-porcelain" />
        </nav>
      )}

      <button
        type="button"
        aria-label="Back to top"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
        }
        className={`fixed bottom-5 right-5 grid size-12 cursor-pointer place-items-center rounded-full bg-navy-950 text-white shadow-[0_14px_30px_-12px_rgb(7_14_46/0.6)] ring-1 ring-white/15 transition-[opacity,transform,visibility,background-color] duration-300 hover:bg-navy-700 active:translate-y-px md:bottom-8 md:right-8 ${
          farDown ? "opacity-100" : "invisible translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp aria-hidden className="size-5" />
      </button>
    </header>
  );
}

const navLink = "relative rounded-full px-4 py-2 text-sm transition-colors hover:bg-white/10 hover:text-white";
// Mint dot under the current page, echoing the logo's speed-line caps.
const navActive =
  "text-white after:absolute after:bottom-0 after:left-1/2 after:size-1.5 after:-translate-x-1/2 after:rounded-full after:bg-mint";

function MegaMenu() {
  return (
    <div className="invisible absolute left-1/2 top-full w-[760px] -translate-x-1/2 pt-4 opacity-0 transition-[opacity,visibility] duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
      <div className="grid grid-cols-[1fr_1.6fr] gap-6 rounded-2xl border border-line bg-white p-6 text-ink shadow-card [&_:focus-visible]:outline-navy-600">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Specialities</p>
          <ul className="mt-3 space-y-1">
            {specialities.map((s) => (
              <li key={s.slug}>
                <Link href={`/specialities/${s.slug}`} className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-porcelain">
                  <span className="flex items-center gap-2.5 text-sm font-medium">
                    <span aria-hidden className="size-2 rounded-full" style={{ background: s.accent }} />
                    {s.name}
                  </span>
                  {s.status === "coming-soon" && <span className="text-[11px] text-muted">Coming soon</span>}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/products" className="mt-4 inline-flex items-center gap-1 px-3 text-sm font-medium text-navy-700 hover:underline">
            All products <ArrowUpRight aria-hidden className="size-3.5" />
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-2">
          {featuredProducts.slice(0, 4).map((p) => (
            <li key={p.slug}>
              <Link href={`/products/${p.slug}`} className="flex items-center gap-3 rounded-xl p-2 hover:bg-porcelain">
                <span className="grid size-14 shrink-0 place-items-center rounded-lg bg-stage">
                  <Image src={p.images[0].src} alt="" width={56} height={56} className="product-shot size-12" />
                </span>
                <span className="text-sm font-medium leading-snug">{p.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
