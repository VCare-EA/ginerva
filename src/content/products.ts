import type { CertificationId, SpecialitySlug } from "./site";
import { certifications } from "./site";

export type Concern = "hair" | "skin" | "body" | "wellness";

export const concerns: Record<Concern, { label: string; hint: string }> = {
  hair: { label: "Hair", hint: "Hair reduction and hair restoration" },
  skin: { label: "Skin", hint: "Texture, hydration, radiance and ageing" },
  body: { label: "Body", hint: "Contouring and soft-tissue massage" },
  wellness: { label: "Pain & wellness", hint: "Muscle relaxation and comfort" },
};

export type Product = {
  slug: string;
  name: string;
  brandLine: "Ginerva" | "Skynis" | "ExoSmart" | "Maxx" | "VeAge";
  kind: "Device" | "Kit" | "Formulation";
  speciality: SpecialitySlug;
  tagline: string;
  summary: string;
  body: string[];
  features: { title: string; text: string }[];
  specs: { label: string; value: string }[];
  areas: string[];
  concerns: Concern[];
  idealFor: string[];
  /** Regulatory badges claimed for this product. Rendered only if the certification itself is verified. */
  badges: CertificationId[];
  madeInIndia?: boolean;
  images: { src: string; alt: string }[];
  featured?: boolean;
  /** Copy is pending from the client: page is shown but kept out of search indexes. */
  draft?: boolean;
};

const gallery = (slug: string, count: number, alt: string) =>
  Array.from({ length: count }, (_, i) => ({ src: `/products/${slug}/${i + 1}.jpg`, alt: `${alt}, view ${i + 1}` }));

export const products: Product[] = [
  {
    slug: "diode-laser-hair-removal",
    name: "Diode Laser Hair Removal System",
    brandLine: "Ginerva",
    kind: "Device",
    speciality: "aesthetic",
    tagline: "808 nm diode laser with integrated contact cooling.",
    summary:
      "A professional aesthetic system for long-term hair reduction, designed for efficient treatments with enhanced patient comfort.",
    body: [
      "The Diode Laser Hair Removal Machine is a professional aesthetic system designed for long-term hair reduction across areas such as the face, arms, underarms, chest, back, bikini line, and legs. It uses targeted laser energy to heat hair follicles and reduce future hair growth.",
      "Featuring an 808 nm wavelength, adjustable energy settings, and an integrated contact-cooling system, the machine is designed to support efficient treatments with enhanced patient comfort. Suitable for professional aesthetic clinics and dermatology centres, it enables controlled hair-reduction procedures when operated by trained personnel.",
    ],
    features: [
      { title: "808 nm wavelength", text: "Targeted laser energy that heats the hair follicle to reduce future growth." },
      { title: "Adjustable energy", text: "Energy settings tuned to the treatment area and the patient in the chair." },
      { title: "Contact cooling", text: "An integrated cooling system designed for enhanced patient comfort." },
      { title: "Full-body coverage", text: "From the face to the legs, one system covers the common treatment areas." },
    ],
    specs: [
      { label: "Wavelength", value: "808 nm" },
      { label: "Energy", value: "Adjustable settings" },
      { label: "Cooling", value: "Integrated contact cooling" },
      { label: "Operation", value: "Trained personnel" },
      { label: "Regulatory", value: "USFDA- and CDSCO-registered" },
    ],
    areas: ["Face", "Arms", "Underarms", "Chest", "Back", "Bikini line", "Legs"],
    concerns: ["hair"],
    idealFor: ["Aesthetic clinics", "Dermatology centres"],
    badges: ["usfda", "cdsco"],
    images: gallery("diode-laser-hair-removal", 3, "Diode laser hair removal machine with handpiece"),
    featured: true,
  },
  {
    slug: "exosmart",
    name: "ExoSmart Plasma Processing Device",
    brandLine: "ExoSmart",
    kind: "Device",
    speciality: "aesthetic",
    tagline: "Ultrafiltration concentrate from the patient's own plasma.",
    summary:
      "An advanced plasma-processing device that concentrates extracellular vesicles, platelets and growth factors from autologous plasma.",
    body: [
      "ExoSmart is an advanced plasma-processing device designed to concentrate plasma-derived components, including extracellular vesicles, platelets, and growth factors, from a patient's own blood plasma using ultrafiltration technology.",
      "It is intended to support applications in aesthetic medicine, dermatology, and hair restoration, subject to the device's approved intended use. The system is designed to process PRP and PPP for the preparation of concentrated plasma fractions.",
    ],
    features: [
      { title: "Ultrafiltration", text: "Concentrates plasma-derived components without changing their source." },
      { title: "Autologous", text: "Works from the patient's own blood plasma." },
      { title: "PRP and PPP", text: "Processes both platelet-rich and platelet-poor plasma." },
    ],
    specs: [
      { label: "Technology", value: "Ultrafiltration" },
      { label: "Input", value: "PRP and PPP" },
      { label: "Output", value: "Concentrated plasma fractions" },
      { label: "Source", value: "Autologous plasma" },
    ],
    areas: ["Face", "Scalp"],
    concerns: ["hair", "skin"],
    idealFor: ["Aesthetic medicine", "Dermatology", "Hair restoration clinics"],
    // Client copy says the CDSCO claim must be verified before publication.
    badges: [],
    images: gallery("exosmart", 2, "ExoSmart plasma processing kit packaging"),
    featured: true,
  },
  {
    slug: "skynis-trim-and-firm",
    name: "Skynis Trim & Firm",
    brandLine: "Skynis",
    kind: "Device",
    speciality: "aesthetic",
    tagline: "Mechanical roller massage for body-care and contouring programmes.",
    summary:
      "A non-invasive body massage system that uses mechanical rolling movements to relax soft tissue and improve the appearance of skin texture.",
    body: [
      "The Trim & Firm Massage Roller Machine is a non-invasive body massage system designed to support body-care and contouring treatments. It uses mechanical rolling movements to massage targeted areas such as the abdomen, waist, thighs, arms, and legs.",
      "The treatment helps relax soft tissues, relieve muscle tension, and improve the appearance of skin texture. It can be incorporated into slimming, wellness, and aesthetic treatment programmes. Suitable for professional beauty and wellness settings, the machine offers a convenient addition to body-care services.",
    ],
    features: [
      { title: "Two roller handpieces", text: "Large and compact rollers for broad areas and smaller contours." },
      { title: "Forward and reverse", text: "Change roller direction to suit the area and technique." },
      { title: "Auto or manual", text: "Run a programmed routine or control speed directly." },
    ],
    specs: [
      { label: "Method", value: "Mechanical rolling massage" },
      { label: "Type", value: "Non-invasive" },
      { label: "Handpieces", value: "Two (large and compact)" },
      { label: "Controls", value: "Forward / reverse, auto / manual, speed" },
    ],
    areas: ["Abdomen", "Waist", "Thighs", "Arms", "Legs"],
    concerns: ["body", "wellness"],
    idealFor: ["Beauty and wellness centres", "Slimming programmes", "Aesthetic clinics"],
    badges: [],
    images: gallery("skynis-trim-and-firm", 3, "Skynis Trim & Firm massage roller machine"),
    featured: true,
  },
  {
    slug: "skynis-needleless-mesotherapy",
    name: "Skynis Needleless Mesotherapy",
    brandLine: "Skynis",
    kind: "Device",
    speciality: "aesthetic",
    tagline: "Needle-free electroporation for serum delivery.",
    summary:
      "Electroporation technology that supports the delivery of compatible skincare serums across the skin surface — without needles.",
    body: [
      "This aesthetic device uses needle-free electroporation technology to support the delivery of compatible skincare serums across the skin surface. It is designed for facial treatments targeting hydration, skin texture, fine lines, and the appearance of ageing.",
      "The machine is intended to support skin revitalisation and improve the appearance of skin tone and radiance without conventional needle-based injections. It may be used in professional aesthetic and skincare settings, subject to the device's intended use and operating instructions.",
    ],
    features: [
      { title: "Needle-free", text: "Electroporation replaces conventional needle-based injection." },
      { title: "Serum delivery", text: "Supports delivery of compatible skincare serums across the skin surface." },
      { title: "Facial focus", text: "Designed for hydration, texture, fine lines and radiance." },
    ],
    specs: [
      { label: "Technology", value: "Electroporation" },
      { label: "Needles", value: "None" },
      { label: "Application", value: "Facial treatments" },
    ],
    areas: ["Face"],
    concerns: ["skin"],
    idealFor: ["Aesthetic clinics", "Skincare studios"],
    badges: [],
    images: gallery("skynis-needleless-mesotherapy", 4, "Skynis needleless mesotherapy device"),
    featured: true,
  },
  {
    slug: "ir-therapy-panel",
    name: "Infrared Therapy Panel",
    brandLine: "Ginerva",
    kind: "Device",
    speciality: "aesthetic",
    tagline: "Indigenously manufactured infrared light panel.",
    summary:
      "Delivers infrared light to targeted areas of the body, providing gentle warming and supporting muscle relaxation.",
    body: [
      "The indigenously manufactured Infrared (IR) Therapy Panel delivers infrared light to targeted areas of the body, providing gentle warming and supporting muscle relaxation. Designed for wellness and aesthetic applications, it may help relieve temporary muscle stiffness and improve comfort.",
      "The panel offers a non-invasive solution for professional wellness centres, aesthetic clinics, and spas. Proudly manufactured in India, it supports domestic medical and wellness technology development.",
    ],
    features: [
      { title: "Gentle warming", text: "Infrared light directed at targeted areas of the body." },
      { title: "Non-invasive", text: "No contact consumables, no downtime." },
      { title: "Made in India", text: "Designed and manufactured at our Puducherry facility." },
    ],
    specs: [
      { label: "Output", value: "Infrared light" },
      { label: "Format", value: "Free-standing panel" },
      { label: "Manufactured", value: "Puducherry, India" },
    ],
    areas: ["Targeted body areas"],
    concerns: ["wellness", "body"],
    idealFor: ["Wellness centres", "Aesthetic clinics", "Spas"],
    badges: [],
    madeInIndia: true,
    images: gallery("ir-therapy-panel", 3, "Infrared therapy panel on a free-standing base"),
    featured: true,
  },
  {
    slug: "gfc-maxx",
    name: "GFC Maxx",
    brandLine: "Maxx",
    kind: "Kit",
    speciality: "aesthetic",
    tagline: "Autologous Growth Factor Concentrate (GFC) kit.",
    summary: "A collection and processing kit for preparing autologous growth factor concentrate.",
    body: [
      "GFC Maxx is a kit for preparing autologous growth factor concentrate (GFC). Detailed product information is being finalised — contact us for the current specification sheet.",
    ],
    features: [],
    specs: [{ label: "Contents", value: "9 ml GFC tube × 2, 9 ml collection tube × 1" }],
    areas: [],
    concerns: ["hair", "skin"],
    idealFor: ["Aesthetic clinics", "Hair restoration clinics"],
    badges: [],
    images: gallery("gfc-maxx", 1, "GFC Maxx kit box"),
    draft: true,
  },
  {
    slug: "maxx-prp",
    name: "Maxx PRP",
    brandLine: "Maxx",
    kind: "Kit",
    speciality: "aesthetic",
    tagline: "Autologous Platelet Rich Plasma (PRP) kit.",
    summary: "A kit for preparing autologous platelet-rich plasma.",
    body: [
      "Maxx PRP is a kit for preparing autologous platelet-rich plasma (PRP). Detailed product information is being finalised — contact us for the current specification sheet.",
    ],
    features: [],
    specs: [],
    areas: [],
    concerns: ["hair", "skin"],
    idealFor: ["Aesthetic clinics", "Dermatology"],
    badges: [],
    images: gallery("maxx-prp", 1, "Maxx PRP kit box"),
    draft: true,
  },
  {
    slug: "veage-exoskin",
    name: "VeAge Exoskin",
    brandLine: "VeAge",
    kind: "Formulation",
    speciality: "aesthetic",
    tagline: "Premium cell-activating stimulator with moisturising.",
    summary: "A two-vial system of lyophilised exosome and activating solution.",
    body: ["VeAge Exoskin pairs a lyophilised exosome vial with an activating solution. Full product information is being finalised — contact us for details."],
    features: [],
    specs: [
      { label: "Vial 1", value: "Lyophilised exosome, 153 mg" },
      { label: "Vial 2", value: "Activating solution, 3 ml" },
    ],
    areas: ["Face"],
    concerns: ["skin"],
    idealFor: ["Aesthetic clinics", "Dermatology"],
    badges: [],
    images: gallery("veage-exoskin", 1, "VeAge Exoskin box with two vials"),
    draft: true,
  },
  {
    slug: "veage-lip",
    name: "VeAge Lip",
    brandLine: "VeAge",
    kind: "Formulation",
    speciality: "aesthetic",
    tagline: "Cross-linked hyaluronic acid with anthocyanin.",
    summary: "A 1.2 ml pre-filled syringe for lip treatments.",
    body: ["VeAge Lip is a cross-linked hyaluronic acid formulation with anthocyanin. Full product information is being finalised — contact us for details."],
    features: [],
    specs: [
      { label: "Composition", value: "Cross-linked hyaluronic acid, anthocyanin" },
      { label: "Volume", value: "1.2 ml pre-filled syringe" },
    ],
    areas: ["Lips"],
    concerns: ["skin"],
    idealFor: ["Aesthetic clinics"],
    badges: [],
    images: gallery("veage-lip", 1, "VeAge Lip box with pre-filled syringe"),
    draft: true,
  },
  {
    slug: "veage-pn-plus",
    name: "VeAge PN+",
    brandLine: "VeAge",
    kind: "Formulation",
    speciality: "aesthetic",
    tagline: "PN+ formulation in a pre-filled syringe.",
    summary: "A pre-filled syringe formulation from the VeAge range.",
    body: ["VeAge PN+ is part of the VeAge skin range. Full product information is being finalised — contact us for details."],
    features: [],
    specs: [{ label: "Format", value: "Pre-filled syringe" }],
    areas: ["Face"],
    concerns: ["skin"],
    idealFor: ["Aesthetic clinics"],
    badges: [],
    images: gallery("veage-pn-plus", 1, "VeAge PN+ box with pre-filled syringe"),
    draft: true,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const featuredProducts = products.filter((p) => p.featured);

export const productBadges = (p: Product) => p.badges.filter((id) => certifications[id].verified);

export const relatedProducts = (p: Product, limit = 3) =>
  products
    .filter((o) => o.slug !== p.slug)
    .map((o) => ({ o, score: o.concerns.filter((c) => p.concerns.includes(c)).length + (o.brandLine === p.brandLine ? 1 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ o }) => o);
