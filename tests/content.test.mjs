// Run: pnpm test (node --test, Node >= 23.6 for native type stripping)
import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { test } from "node:test";

// Map the app's "@/" alias and extension-less imports onto .ts files so Node can load the source directly.
registerHooks({
  resolve(specifier, context, next) {
    const spec = specifier.startsWith("@/") ? new URL(`../src/${specifier.slice(2)}`, import.meta.url).href : specifier;
    try {
      return next(spec, context);
    } catch (err) {
      if (spec.startsWith(".") || spec.startsWith("file:")) return next(`${spec}.ts`, context);
      throw err;
    }
  },
});

// Dynamic imports are required here: the hook above must be registered before these modules resolve.
const { enquirySchema } = await import("../src/lib/enquiry-schema.ts");
const { products, productBadges, relatedProducts, getProduct } = await import("../src/content/products.ts");
const { certifications } = await import("../src/content/site.ts");

const valid = {
  name: "Dr. Meenakshi Raghavan",
  role: "Clinician",
  email: "meenakshi@skinclinic.in",
  phone: "+91 98410 27365",
  message: "Interested in a demo of the diode laser.",
  consent: "on",
};

test("enquiry schema accepts a complete enquiry and rejects bad input", () => {
  assert.ok(enquirySchema.safeParse(valid).success);
  assert.ok(enquirySchema.safeParse({ ...valid, product: "diode-laser-hair-removal" }).success);
  for (const bad of [{ email: "nope" }, { phone: "call me" }, { consent: undefined }, { product: "made-up" }, { role: "CEO" }]) {
    assert.equal(enquirySchema.safeParse({ ...valid, ...bad }).success, false, JSON.stringify(bad));
  }
});

test("unverified certifications never surface as product badges", () => {
  for (const p of products) {
    for (const id of productBadges(p)) assert.ok(certifications[id].verified, `${p.slug}: ${id}`);
  }
});

test("related products exclude the product itself and prefer shared concerns", () => {
  const diode = getProduct("diode-laser-hair-removal");
  const related = relatedProducts(diode, 3);
  assert.equal(related.length, 3);
  assert.ok(!related.some((p) => p.slug === diode.slug));
  assert.ok(related[0].concerns.some((c) => diode.concerns.includes(c)));
});

test("product slugs are unique and every product has an image", () => {
  assert.equal(new Set(products.map((p) => p.slug)).size, products.length);
  for (const p of products) assert.ok(p.images.length > 0, p.slug);
});
