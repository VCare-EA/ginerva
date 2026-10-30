import { ButtonLink, Display, Eyebrow, SpeedLines } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[100dvh] items-center gap-10 py-32 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <Eyebrow>Error 404</Eyebrow>
        <Display as="h1" accent="moved on." className="mt-6 text-5xl text-navy-950 md:text-6xl">
          This page has
        </Display>
        <p className="mt-6 max-w-md text-lg text-muted">The link may be out of date. Our products and team are a click away.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/products">Browse products</ButtonLink>
          <ButtonLink href="/" variant="outline">
            Back to home
          </ButtonLink>
        </div>
      </div>
      <SpeedLines unit={28} className="hidden lg:col-span-5 lg:flex" />
    </section>
  );
}
