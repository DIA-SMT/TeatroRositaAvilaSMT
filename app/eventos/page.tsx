import type { Metadata } from "next";
import { EventsExplorer } from "@/components/events-explorer";
import { PageHeader } from "@/components/page-header";
import { getEvents } from "@/lib/events";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Cartelera",
  description: "Todas las funciones del Teatro Municipal Rosita Ávila. Comprá tus entradas online.",
};

export default async function EventosPage() {
  const events = await getEvents();

  return (
    <>
      <PageHeader
        eyebrow="Cartelera"
        title={
          <>
            Todas las <span className="text-accent-gradient italic">funciones</span>
          </>
        }
        description="Teatro, música, humor y espectáculos para toda la familia en el Rosita Ávila."
      />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <EventsExplorer events={events} />
      </section>
    </>
  );
}
