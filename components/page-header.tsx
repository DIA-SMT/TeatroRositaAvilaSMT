export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description?: string }) {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-14">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgb(37_86_201/0.35),transparent_60%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-20 bg-curtain opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-4 flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-accent-400 uppercase">
          <span className="h-px w-8 bg-accent-400/60" />
          {eyebrow}
        </p>
        <h1 className="font-display text-5xl leading-none font-semibold text-balance sm:text-6xl">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-lg text-muted">{description}</p>}
      </div>
    </section>
  );
}
