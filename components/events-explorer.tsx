"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { EventCard } from "@/components/event-card";
import type { TheaterEvent } from "@/lib/events";
import { formatMonthKey } from "@/lib/format";
import { cn } from "@/lib/utils";

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

export function EventsExplorer({ events }: { events: TheaterEvent[] }) {
  const [query, setQuery] = useState("");
  const [month, setMonth] = useState<string | null>(null);

  const months = useMemo(() => [...new Set(events.map((e) => formatMonthKey(e.nextDate!)))], [events]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return events.filter(
      (e) =>
        (!month || e.performances.some((p) => formatMonthKey(p.date) === month)) &&
        (!q || normalize(`${e.title} ${e.subtitle ?? ""}`).includes(q)),
    );
  }, [events, query, month]);

  const chip = (active: boolean) =>
    cn(
      "h-10 rounded-full border px-5 text-sm transition-colors",
      active
        ? "border-accent-400 bg-accent-400 text-background"
        : "border-border text-muted hover:border-accent-400/50 hover:text-foreground",
    );

  return (
    <>
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative w-full lg:max-w-sm">
          <span className="sr-only">Buscar espectáculo</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar espectáculo o artista…"
            className="h-12 w-full rounded-full border border-border bg-surface pr-11 pl-11 text-sm placeholder:text-muted focus:border-accent-400/60 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Borrar búsqueda"
              className="absolute top-1/2 right-3 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </label>

        {months.length > 1 && (
          <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="group" aria-label="Filtrar por mes">
            <button type="button" onClick={() => setMonth(null)} className={chip(!month)} aria-pressed={!month}>
              Todos
            </button>
            {months.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMonth(m === month ? null : m)}
                className={cn(chip(m === month), "shrink-0")}
                aria-pressed={m === month}
              >
                {m}
              </button>
            ))}
          </div>
        )}
      </div>

      {filtered.length ? (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((event, i) => (
            <EventCard key={event.id} event={event} priority={i < 4} compact />
          ))}
        </div>
      ) : (
        <EmptyState
          title={events.length ? "Sin resultados" : "Pronto, nuevas funciones"}
          text={
            events.length
              ? "No encontramos espectáculos con ese filtro. Probá con otra búsqueda."
              : "En este momento no hay funciones publicadas. Volvé a visitarnos en unos días."
          }
        />
      )}
    </>
  );
}
