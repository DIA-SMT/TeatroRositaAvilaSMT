"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EventCard } from "@/components/event-card";
import type { TheaterEvent } from "@/lib/events";
import { cn } from "@/lib/utils";

export function EventsCarousel({ events }: { events: TheaterEvent[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 24), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={track}
        onScroll={update}
        className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-4 px-4 pb-6 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8"
      >
        {events.map((event, i) => (
          <div
            key={event.id}
            data-slide
            className="w-[80%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
          >
            <EventCard event={event} priority={i < 2} className="h-full" />
          </div>
        ))}
      </div>

      <div className="mt-2 flex justify-end gap-2">
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => scroll(dir)}
            disabled={dir === -1 ? edges.start : edges.end}
            aria-label={dir === -1 ? "Anteriores" : "Siguientes"}
            className={cn(
              "grid size-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-accent-400/60 hover:text-accent-300 disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground",
            )}
          >
            {dir === -1 ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
          </button>
        ))}
      </div>
    </div>
  );
}
