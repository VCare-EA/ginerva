import Image from "next/image";
import { certifications, verifiedCertifications } from "@/content/site";

export function CertificationStrip() {
  return (
    <section aria-label="Certifications" className="border-y border-line bg-white">
      <div className="container-page flex flex-col gap-6 py-8 xl:flex-row xl:items-center xl:justify-between xl:gap-12">
        <p className="shrink-0 text-sm text-muted xl:max-w-[20ch]">Manufactured under certified, audited quality systems</p>
        <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          {verifiedCertifications.map((id) => {
            const c = certifications[id];
            return (
              <li key={id} className="flex items-center gap-3">
                {c.logo ? (
                  <Image src={c.logo} alt="" width={56} height={56} className="size-12 object-contain mix-blend-multiply grayscale" />
                ) : (
                  <span aria-hidden className="grid size-12 place-items-center rounded-full border border-navy-700/25 font-mono text-[10px] font-semibold text-navy-700">
                    ISO
                  </span>
                )}
                <span className="text-sm leading-tight">
                  <span className="block font-medium text-ink">{c.name}</span>
                  <span className="text-muted">{c.detail}</span>
                </span>
              </li>
            );
          })}
          <li className="flex items-center gap-3">
            <span aria-hidden className="flex h-12 w-3 flex-col overflow-hidden rounded-full">
              <span className="flex-1 bg-[#ff9933]" />
              <span className="flex-1 bg-white ring-1 ring-line ring-inset" />
              <span className="flex-1 bg-[#138808]" />
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-medium text-ink">Made in India</span>
              <span className="text-muted">Puducherry facility</span>
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
