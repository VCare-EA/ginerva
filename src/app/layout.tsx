import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MotionRoot } from "@/components/motion-root";
import { site } from "@/content/site";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.legalName, locale: "en_IN", images: ["/logo.png"] },
  robots: process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production" ? { index: false } : undefined,
};

export const viewport: Viewport = { themeColor: "#132474" };

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  url: site.url,
  logo: `${site.url}/logo.png`,
  email: site.email,
  address: site.addresses.map((a) => ({
    "@type": "PostalAddress",
    name: a.label,
    streetAddress: a.street,
    addressLocality: a.locality,
    postalCode: a.postalCode,
    addressCountry: "IN",
  })),
};

// Sets html.motion before first paint so [data-reveal] content starts hidden instead of flashing.
const motionScript = `if(matchMedia('(prefers-reduced-motion: no-preference)').matches)document.documentElement.classList.add('motion')`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${geist.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd).replace(/</g, "\\u003c") }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-navy-700 px-5 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MotionRoot />
      </body>
    </html>
  );
}
