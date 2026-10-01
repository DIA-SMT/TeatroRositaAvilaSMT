import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { AboutSection } from "@/components/home/about-section";
import { EventsCarousel } from "@/components/home/events-carousel";
import { Hero } from "@/components/home/hero";
import { LocationSection } from "@/components/home/location-section";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { CURTAIN_OPEN_PX } from "@/lib/curtain";
import { getEvents, pickFeatured } from "@/lib/events";

export const revalidate = 300;

export default async function HomePage() {
  const events = await getEvents();

  return (
    <>
      {/* El hero queda fijo mientras el telón se abre con los primeros scrolls; después la página sigue normal. */}
      <div style={{ height: `calc(100svh + ${CURTAIN_OPEN_PX}px)` }}>
        <div className="sticky top-0">
          <Hero featured={pickFeatured(events)} />
        </div>
      </div>

      <section id="cartelera" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="En cartelera"
              title="Próximas funciones"
              description="Elegí tu espectáculo y comprá tu entrada online."
            />
            <Link href="/eventos" className={buttonVariants({ variant: "ghost", className: "px-0" })}>
              Ver toda la cartelera <ArrowRight className="size-4" />
            </Link>
          </div>
          {events.length ? (
            <EventsCarousel events={events} />
          ) : (
            <EmptyState
              title="Pronto, nuevas funciones"
              text="En este momento no hay funciones publicadas. Volvé a visitarnos en unos días."
            />
          )}
        </div>
      </section>

      <AboutSection />
      <LocationSection />
    </>
  );
}
