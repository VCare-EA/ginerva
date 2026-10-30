import Link from "next/link";
import { products } from "@/content/products";
import { certifications, nav, site, specialities, verifiedCertifications } from "@/content/site";
import { BrandStripe, Logo, SpeedLines } from "./ui";

const legal = [
  { href: "/legal/privacy", label: "Privacy policy" },
  { href: "/legal/terms", label: "Terms of use" },
  { href: "/legal/medical-disclaimer", label: "Medical disclaimer" },
];

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-navy-950 text-white/75">
      <BrandStripe />
      <SpeedLines className="pointer-events-none absolute -right-6 top-14 opacity-25" unit={22} />
      <div className="container-page relative grid gap-10 py-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo variant="white" className="h-9 w-auto" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">{site.tagline}</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-block text-lg font-medium text-white underline decoration-mint decoration-2 underline-offset-[6px] hover:decoration-white"
          >
            {site.email}
          </a>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Certifications">
            {verifiedCertifications.map((id) => (
              <li key={id} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/80">
                {certifications[id].name}
              </li>
            ))}
          </ul>
        </div>

        <FooterColumn title="Company" className="md:col-span-2">
          {nav.map((n) => (
            <FooterLink key={n.href} href={n.href}>
              {n.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Specialities" className="md:col-span-2">
          {specialities.map((s) => (
            <FooterLink key={s.slug} href={`/specialities/${s.slug}`}>
              {s.name.replace(" devices", "")}
            </FooterLink>
          ))}
          <FooterLink href="/products">All {products.length} products</FooterLink>
        </FooterColumn>

        <div className="grid gap-8 sm:grid-cols-2 md:col-span-4">
          {site.addresses.map((a) => (
            <address key={a.label} className="not-italic">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">{a.label}</p>
              <p className="mt-3 text-sm leading-relaxed">
                {a.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
            </address>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {site.legalName}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">{title}</p>
      <ul className="mt-2 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="inline-flex min-h-11 items-center transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}
