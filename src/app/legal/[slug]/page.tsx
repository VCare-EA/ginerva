import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { PageSkeleton } from "@/components/ui";
import { site } from "@/content/site";

// ponytail: starter copy pending legal review (docs/DEVELOPMENT_PLAN.md, content gaps). Move to the CMS with the rest of the content.
const pages: Record<string, { title: string; summary: string; sections: { heading: string; body: string }[] }> = {
  privacy: {
    title: "Privacy policy",
    summary: `How ${site.legalName} collects and uses personal data shared through this website, in line with India's Digital Personal Data Protection Act, 2023.`,
    sections: [
      {
        heading: "What we collect",
        body: "When you submit an enquiry we collect the details you enter: name, organisation, role, email address, phone number, city, the product or topic you ask about and your message. We do not use advertising cookies or sell personal data.",
      },
      {
        heading: "Why we use it",
        body: "We use your details only to respond to your enquiry, provide product information, arrange demonstrations and, where you are a customer or partner, to fulfil that relationship. Your consent is recorded when you submit the form.",
      },
      {
        heading: "How long we keep it",
        body: "Enquiry data is kept for as long as needed to respond and maintain a business relationship, and then deleted unless the law requires us to retain it.",
      },
      {
        heading: "Your rights",
        body: `You may ask to access, correct or erase your personal data, or withdraw consent, at any time by writing to ${site.email}. We will respond within the timelines set by applicable law.`,
      },
      {
        heading: "Service providers",
        body: "Enquiries are delivered to our team through an email service provider acting on our instructions. Website hosting providers may process technical data such as IP addresses to keep the site secure.",
      },
    ],
  },
  terms: {
    title: "Terms of use",
    summary: `The terms that apply when you use this website, operated by ${site.legalName}.`,
    sections: [
      {
        heading: "Information only",
        body: "Content on this site describes our products and company for professional audiences. It is not an offer for sale; availability, specifications and regulatory status may vary by market and change without notice.",
      },
      {
        heading: "Intellectual property",
        body: "The Ginerva name, logo, product names, images and text on this site belong to Ginerva Universal Corporation LLP or its licensors and may not be reused without permission.",
      },
      {
        heading: "Liability",
        body: "We take care to keep information accurate but provide it without warranty. To the extent permitted by law, we are not liable for loss arising from reliance on website content.",
      },
      {
        heading: "Governing law",
        body: "These terms are governed by the laws of India, and the courts of Puducherry have jurisdiction over any dispute.",
      },
    ],
  },
  "medical-disclaimer": {
    title: "Medical disclaimer",
    summary: "Important information about the medical devices and treatments described on this site.",
    sections: [
      {
        heading: "For professional use",
        body: "Ginerva devices are intended for use by trained, qualified medical and aesthetic professionals in accordance with the instructions for use supplied with each device.",
      },
      {
        heading: "Not medical advice",
        body: "Information on this site is general and does not replace a consultation with a qualified practitioner. Suitability of any treatment must be assessed for each patient.",
      },
      {
        heading: "Results vary",
        body: "Treatment outcomes depend on the individual patient, the indication and the practitioner. Images and descriptions are illustrative and do not guarantee any specific result.",
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const page = pages[(await params).slug];
  return page ? { title: page.title, description: page.summary } : {};
}

export default function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <LegalDetail params={params} />
    </Suspense>
  );
}

async function LegalDetail({ params }: Pick<PageProps<"/legal/[slug]">, "params">) {
  const page = pages[(await params).slug];
  if (!page) notFound();

  return (
    <>
      <PageHero eyebrow="Legal" title={page.title}>
        {page.summary}
      </PageHero>
      <article className="container-page pb-16 md:pb-20">
        <div className="max-w-[68ch] divide-y divide-line border-t border-line">
          {page.sections.map((s) => (
            <section key={s.heading} className="py-8">
              <h2 className="text-xl font-medium tracking-tight">{s.heading}</h2>
              <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
