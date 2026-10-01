import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, ExternalLink, MapPin, Ticket } from "lucide-react";
import { EventCard } from "@/components/event-card";
import { StatusBadge } from "@/components/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { getEventBySlug, getEvents, type Performance } from "@/lib/events";
import { formatDate, formatPrice, formatTime } from "@/lib/format";
import { site } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/eventos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Evento no encontrado" };

  const description =
    event.synopsis?.slice(0, 160) ??
    `${event.title}${event.subtitle ? ` · ${event.subtitle}` : ""} en el ${site.name}. Comprá tus entradas online.`;
  return {
    title: event.title,
    description,
    openGraph: { title: event.title, description, images: event.image ? [{ url: event.image }] : undefined },
  };
}

export default async function EventoPage({ params }: PageProps<"/eventos/[slug]">) {
  const { slug } = await params;
  const events = await getEvents();
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  const others = events.filter((e) => e.id !== event.id).slice(0, 4);
  const paragraphs = event.synopsis?.split(/\n\s*\n/).filter(Boolean) ?? [];

  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-16 lg:pt-36">
        {event.image && (
          <Image src={event.image} alt="" fill priority sizes="100vw" className="-z-20 scale-110 object-cover opacity-30 blur-3xl" />
        )}
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-background/40 via-background/80 to-background" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/eventos" className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent-300">
            <ArrowLeft className="size-4" /> Volver a la cartelera
          </Link>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16">
            <div className="relative mx-auto w-full max-w-sm lg:mx-0">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-brand-500/20 blur-3xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-accent-400/30 bg-surface shadow-2xl shadow-black/60">
                {event.image && (
                  <Image src={event.image} alt={`Afiche de ${event.title}`} fill priority sizes="(min-width: 1024px) 380px, 90vw" className="object-cover" />
                )}
                <StatusBadge status={event.status} isFree={event.isFree} className="absolute top-4 right-4" />
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-xs font-semibold tracking-[0.3em] text-accent-400 uppercase">{site.name}</p>
              <h1 className="mt-3 font-display text-5xl leading-[1.02] font-semibold text-balance sm:text-6xl">{event.title}</h1>
              {event.subtitle && <p className="mt-3 text-xl text-foreground/80">{event.subtitle}</p>}

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                {event.nextDate && (
                  <span className="flex items-center gap-2">
                    <CalendarDays className="size-4 text-accent-400" /> {formatDate(event.nextDate)}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <MapPin className="size-4 text-accent-400" /> {site.name}
                </span>
              </div>

              {paragraphs.length > 0 && (
                <div className="mt-8 max-w-2xl space-y-4 leading-relaxed text-foreground/80">
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}

              <div className="mt-10">
                <h2 className="mb-4 text-xs font-semibold tracking-[0.25em] text-accent-400 uppercase">
                  {event.performances.length === 1 ? "Función" : "Funciones"}
                </h2>
                <ul className="space-y-3">
                  {event.performances.map((p) => (
                    <PerformanceRow key={p.id} performance={p} ticketUrl={event.ticketUrl} />
                  ))}
                </ul>
                <p className="mt-4 flex items-center gap-1.5 text-xs text-muted">
                  <ExternalLink className="size-3.5" />
                  La compra se realiza en entradas.smt.gob.ar, la plataforma oficial de la Municipalidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-display text-3xl font-semibold">También en cartelera</h2>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {others.map((e) => (
              <EventCard key={e.id} event={e} compact />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function PerformanceRow({ performance: p, ticketUrl }: { performance: Performance; ticketUrl: string }) {
  const prices = p.sections.map((s) => s.price);
  const min = prices.length ? Math.min(...prices) : null;
  const max = prices.length ? Math.max(...prices) : null;

  return (
    <li className="flex flex-col gap-4 rounded-2xl border border-border bg-surface/80 p-5 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-medium">{formatDate(p.date)}</p>
        <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <Clock className="size-4 text-accent-400" /> {formatTime(p.date)}
          </span>
          {min != null && (
            <span>
              {min === 0 ? "Entrada libre" : min === max ? formatPrice(min) : `${formatPrice(min)} – ${formatPrice(max!)}`}
            </span>
          )}
        </p>
      </div>
      {p.status === "disponible" ? (
        <a href={ticketUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "primary" })}>
          <Ticket className="size-4" /> Comprar entradas
        </a>
      ) : (
        <span className="rounded-full border border-border px-5 py-2.5 text-center text-sm text-muted">
          {p.status === "agotado" ? "Agotado" : "Venta próximamente"}
        </span>
      )}
    </li>
  );
}
