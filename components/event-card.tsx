import Image from "next/image";
import Link from "next/link";
import { Clock, Ticket } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { buttonVariants } from "@/components/ui/button";
import type { TheaterEvent } from "@/lib/events";
import { formatDay, formatMonth, formatPrice, formatShortDate, formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Card de evento estilo afiche. Con `compact`, en mobile pasa a fila horizontal (afiche chico + datos)
 * para que los listados no ocupen una pantalla por evento; desde `sm` vuelve al formato vertical.
 */
export function EventCard({
  event,
  className,
  priority,
  compact,
}: {
  event: TheaterEvent;
  className?: string;
  priority?: boolean;
  compact?: boolean;
}) {
  const date = event.nextDate!;
  const extra = event.performances.length - 1;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-500 hover:-translate-y-1 hover:border-accent-400/40 hover:shadow-2xl hover:shadow-brand-900/60",
        compact && "max-sm:flex-row max-sm:hover:translate-y-0",
        className,
      )}
    >
      <div className={cn("relative aspect-[4/5] overflow-hidden bg-surface-2", compact && "max-sm:w-28 max-sm:shrink-0 max-sm:self-start")}>
        {event.image && (
          <Image
            src={event.image}
            alt={`Afiche de ${event.title}`}
            fill
            priority={priority}
            sizes={
              compact
                ? "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 112px"
                : "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 85vw"
            }
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className={cn("absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent", compact && "max-sm:hidden")} />
        <div
          className={cn(
            "absolute top-3 left-3 flex flex-col items-center rounded-xl border border-accent-400/30 bg-background/80 px-3 py-2 text-center backdrop-blur",
            compact && "max-sm:hidden",
          )}
        >
          <span className="font-display text-2xl leading-none font-semibold text-accent-300">{formatDay(date)}</span>
          <span className="mt-1 text-[10px] font-semibold tracking-[0.2em] text-muted">{formatMonth(date)}</span>
        </div>
        <StatusBadge
          status={event.status}
          isFree={event.isFree}
          className={cn("absolute top-3 right-3", compact && "max-sm:top-2 max-sm:right-auto max-sm:left-2 max-sm:px-2 max-sm:text-[9px]")}
        />
      </div>

      <div className={cn("flex flex-1 flex-col gap-3 p-5", compact && "max-sm:min-w-0 max-sm:gap-2 max-sm:p-4")}>
        <div>
          <h3 className={cn("font-display text-xl leading-tight font-semibold text-balance", compact && "max-sm:text-lg")}>
            <Link href={`/eventos/${event.slug}`} className="after:absolute after:inset-0">
              {event.title}
            </Link>
          </h3>
          {event.subtitle && <p className="mt-1 line-clamp-1 text-sm text-muted">{event.subtitle}</p>}
        </div>

        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          <Clock className="size-4 shrink-0 text-accent-400" />
          {formatShortDate(date)} · {formatTime(date)}
          {extra > 0 && <span className="text-accent-300">+{extra} {extra === 1 ? "función" : "funciones"}</span>}
        </p>

        <div
          className={cn(
            "mt-auto flex items-center justify-between gap-3 border-t border-border pt-4",
            compact && "max-sm:flex-wrap max-sm:gap-2 max-sm:border-0 max-sm:pt-0",
          )}
        >
          <span className="text-sm">
            {event.isFree ? (
              <span className="font-semibold text-accent-300">Entrada libre</span>
            ) : event.minPrice != null ? (
              <>
                <span className="text-muted">Desde </span>
                <span className="font-semibold">{formatPrice(event.minPrice)}</span>
              </>
            ) : null}
          </span>
          {event.status === "disponible" && (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "primary", size: "sm", className: "relative z-10" })}
            >
              <Ticket className="size-4" />
              Comprar
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
