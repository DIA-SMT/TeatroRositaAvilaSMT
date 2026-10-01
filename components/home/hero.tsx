import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronDown, Ticket } from "lucide-react";
import { HeroSlideshow } from "@/components/home/hero-slideshow";
import { buttonVariants } from "@/components/ui/button";
import type { TheaterEvent } from "@/lib/events";
import { formatDate, formatTime } from "@/lib/format";
import { site } from "@/lib/site";

export function Hero({ featured }: { featured: TheaterEvent | null }) {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16">
      {/* Fondo: fotos del teatro rotando + velo sólo del lado del texto para que se lea */}
      <HeroSlideshow />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgb(7_11_22/0.85),rgb(7_11_22/0.45)_45%,rgb(7_11_22/0.1)_75%,rgb(7_11_22/0.3)),linear-gradient(to_bottom,rgb(7_11_22/0.35),transparent_25%,transparent_70%,var(--color-background))]" />
      <div className="absolute inset-0 -z-20 bg-background/45 lg:hidden" />
      <div className="absolute top-0 left-1/2 -z-20 h-[70vh] w-[60vw] -translate-x-1/2 animate-spot bg-[radial-gradient(ellipse_at_top,rgb(220_235_255/0.1),transparent_70%)]" />

      {/* El telón es global (components/curtain-stage.tsx); acá sólo el fundido hacia la cartelera */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-t from-background to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 sm:px-10 lg:grid-cols-[1.25fr_1fr] lg:px-16">
        <div className="curtain-reveal animate-fade-up [animation-delay:200ms]">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.35em] text-accent-400 uppercase">
            <span className="h-px w-10 bg-accent-400/70" />
            Teatro Municipal · {site.city}
          </p>
          <h1 className="font-display text-6xl leading-[0.95] font-semibold sm:text-7xl lg:text-8xl">
            Teatro
            <br />
            <span className="text-accent-gradient italic">Rosita Ávila</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/80">
            Teatro, música, humor y espectáculos para toda la familia. Mirá la cartelera y conseguí tus entradas
            online.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/eventos" className={buttonVariants({ variant: "accent", size: "lg" })}>
              Ver cartelera
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={site.ticketsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <Ticket className="size-4" />
              Comprar entradas
            </a>
          </div>
        </div>

        {featured && <FeaturedPoster event={featured} />}
      </div>

      <a
        href="#cartelera"
        aria-label="Ir a la cartelera"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-accent-300/80 hover:text-accent-300"
      >
        <ChevronDown className="size-7" />
      </a>
    </section>
  );
}

function FeaturedPoster({ event }: { event: TheaterEvent }) {
  return (
    <Link
      href={`/eventos/${event.slug}`}
      className="group relative mx-auto hidden w-full max-w-[min(24rem,calc((100svh-16rem)*0.8))] curtain-reveal animate-fade-up [animation-delay:450ms] lg:block"
    >
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-brand-500/25 blur-3xl transition-opacity group-hover:opacity-80" />
      <div className="rotate-2 overflow-hidden rounded-2xl border border-accent-400/40 bg-surface shadow-2xl shadow-black/60 transition-transform duration-700 group-hover:rotate-0">
        {event.image && (
          <div className="relative aspect-[4/5]">
            <Image src={event.image} alt={`Afiche de ${event.title}`} fill priority sizes="384px" className="object-cover" />
          </div>
        )}
        <div className="space-y-1 border-t border-accent-400/20 p-5">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-accent-400 uppercase">Próxima función</p>
          <p className="font-display text-2xl leading-tight font-semibold">{event.title}</p>
          {event.nextDate && (
            <p className="flex items-center gap-2 pt-1 text-sm text-muted">
              <CalendarDays className="size-4 text-accent-400" />
              {formatDate(event.nextDate)} · {formatTime(event.nextDate)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
