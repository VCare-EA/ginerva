// ponytail: content lives in typed modules shaped like the planned Sanity schema
// (docs/DEVELOPMENT_PLAN.md §4). Swap these exports for GROQ queries when the CMS is provisioned.

export const site = {
  name: "Ginerva",
  legalName: "Ginerva Universal Corporation LLP",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ginerva.com",
  tagline: "Precision medical devices for aesthetic, orthopaedic and dental care.",
  description:
    "Ginerva Universal Corporation LLP assembles, manufactures and distributes medical devices for the aesthetic, orthopaedic and dental sectors from an ISO 13485 certified, cleanroom-equipped facility in Puducherry, India.",
  email: "care@ginerva.com",
  addresses: [
    {
      label: "Factory",
      lines: ["Plot No. A-31 & 32, PIPDIC Electronic Park", "Thirubhuvanai, Puducherry 605107", "India"],
      locality: "Puducherry",
      postalCode: "605107",
      street: "Plot No. A-31 & 32, PIPDIC Electronic Park, Thirubhuvanai",
    },
    {
      label: "Corporate office",
      lines: ["81B, Prince Info Park, B Block, 1st Floor", "2nd Main Road, Ambattur Industrial Estate", "Chennai 600058, India"],
      locality: "Chennai",
      postalCode: "600058",
      street: "81B, Prince Info Park, B Block, 1st Floor, 2nd Main Road, Ambattur Industrial Estate",
    },
  ],
} as const;

export const nav = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/quality", label: "Quality" },
  { href: "/private-label", label: "Private label" },
  { href: "/contact", label: "Contact" },
] as const;

export type SpecialitySlug = "aesthetic" | "orthopaedic" | "dental";

export const specialities: {
  slug: SpecialitySlug;
  name: string;
  status: "active" | "coming-soon";
  short: string;
  body: string;
  accent: string;
}[] = [
  {
    slug: "aesthetic",
    name: "Aesthetic devices",
    status: "active",
    short: "Reliable, practitioner-friendly devices for dermatology, trichology and aesthetic clinics.",
    body: "Aesthetics is where Ginerva began, and our clinical roots keep us close to what practitioners need. Our range covers laser hair reduction, needle-free skin revitalisation, body contouring, infrared therapy and autologous plasma processing.",
    accent: "var(--color-lavender)",
  },
  {
    slug: "orthopaedic",
    name: "Orthopaedic devices",
    status: "coming-soon",
    short: "Devices and accessories built for strength, accuracy and dependable fit.",
    body: "We are building a range of orthopaedic devices and accessories for surgeons, hospitals and rehabilitation centres, made to the same ISO 13485 standards as everything we ship.",
    accent: "var(--color-ember)",
  },
  {
    slug: "dental",
    name: "Dental devices",
    status: "coming-soon",
    short: "Hygienic, consistent devices and consumables that clinics and laboratories can depend on.",
    body: "Our dental range is in development: devices and consumables for clinics and dental laboratories where hygiene and batch-to-batch consistency matter most.",
    accent: "var(--color-mint)",
  },
];

export type CertificationId = "iso13485" | "cdsco" | "usfda" | "ce";

// `verified: false` hides the badge everywhere until the certificate is on file (Risk R3).
export const certifications: Record<CertificationId, { name: string; detail: string; logo?: string; verified: boolean }> = {
  iso13485: { name: "ISO 13485:2016", detail: "Certified quality management system", verified: true },
  cdsco: { name: "CDSCO", detail: "Central Drugs Standard Control Organisation", logo: "/certs/cdsco.jpg", verified: true },
  usfda: { name: "USFDA", detail: "US Food & Drug Administration", logo: "/certs/fda.jpg", verified: true },
  ce: { name: "CE", detail: "Conformité Européenne", logo: "/certs/ce.jpg", verified: false },
};

export const verifiedCertifications = (Object.keys(certifications) as CertificationId[]).filter(
  (id) => certifications[id].verified,
);

export const company = {
  story: [
    "Ginerva Universal Corporation LLP is a medical device company engaged in the assembly, manufacturing and distribution of devices for the aesthetic, orthopaedic and dental sectors. Based in Puducherry, we operate a modern, cleanroom-equipped facility under an ISO 13485 certified quality management system.",
    "Ginerva was founded on a simple belief: the professionals who care for patients every day deserve devices built with the same care they give. That belief grew out of our leadership's hands-on experience in clinical practice and the aesthetic industry, and it shapes every product we make.",
  ],
  whatWeDo:
    "We are currently focused on three specialities where precision and hygiene directly shape patient outcomes. As we grow, we are keen to explore opportunities in other healthcare fields as well.",
  privateLabel:
    "Alongside our own range, we welcome partners from any industry we are equipped to serve through private label manufacturing, producing products to their specifications under their own brand name.",
  quality:
    "Quality at Ginerva is built into every step, not checked at the end. Our ISO 13485 certified quality system, controlled cleanroom manufacturing and documented processes ensure that every device is safe, reliable and consistent, batch after batch.",
  leader: {
    name: "Mrs. Carolin Praba Arockiasamy",
    title: "Designated Partner",
    bio: [
      "Ginerva is led by its Designated Partner, Mrs. Carolin Praba Arockiasamy, a renowned trichologist and accomplished entrepreneur in the aesthetic industry in South India. Her years of clinical practice give her a first-hand understanding of what professionals expect from the devices they use: precision, safety and consistent results.",
      "Under her leadership, Ginerva brings practitioner insight together with disciplined, standards-based manufacturing — growing from its roots in aesthetics into orthopaedic and dental care.",
    ],
  },
  vision:
    "To be a globally trusted leader in healthcare and medical device innovation, advancing patient care through quality, safety, technological excellence, and sustainable healthcare solutions.",
  mission:
    "At Ginerva Universal Corporation LLP, we are committed to developing, manufacturing, and delivering safe, effective, and high-quality healthcare and medical device solutions that consistently meet applicable regulatory, statutory, and customer requirements. Through innovation, operational excellence, robust quality management systems, ethical business practices, and continual improvement, we strive to enhance healthcare accessibility and improve patient outcomes worldwide.",
  qualityPolicy: {
    statement:
      "Ginerva Universal Corporation LLP is committed to manufacturing and supplying safe, effective, and reliable medical devices that meet customer, regulatory, and statutory requirements.",
    commitments: [
      "Comply with ISO 13485:2016, Indian MDR 2017, and applicable international standards.",
      "Ensure product safety, sterility, and performance through validated processes and controlled manufacturing environments.",
      "Establish and monitor measurable quality objectives that support continual improvement.",
      "Foster competence, accountability, and awareness through training and employee involvement.",
      "Enhance customer satisfaction by delivering quality products on time and in compliance with requirements.",
      "Continually improve the effectiveness of the Quality Management System (QMS).",
    ],
    footer:
      "This policy is communicated to all employees, reviewed periodically for continuing suitability, and is authorised by top management.",
  },
} as const;

export const qualitySteps = [
  { title: "Design & documentation", text: "Every device starts as a controlled design file with documented requirements and risk analysis." },
  { title: "Cleanroom assembly", text: "Assembly takes place in a controlled cleanroom environment under validated procedures." },
  { title: "Validation & testing", text: "Safety, sterility and performance are verified through validated processes before release." },
  { title: "Batch release", text: "Each batch is reviewed against its records so the device you receive matches the one we validated." },
] as const;
