import "server-only";
import { unstable_cache } from "next/cache";
import { getShow, listShows, REVALIDATE_SECONDS, ticketUrl, type AplausosShow } from "./aplausos";
import { parseLocalDateTime } from "./format";
import { supabase } from "./supabase";
import { slugify } from "./utils";

export type EventStatus = "disponible" | "agotado" | "sin-venta";

export type Performance = {
  id: string;
  date: string; // ISO UTC
  sections: { id: string; name: string; price: number; available: boolean }[];
  status: EventStatus;
};

export type TheaterEvent = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  image: string | null;
  synopsis: string | null;
  performances: Performance[];
  nextDate: string | null;
  minPrice: number | null;
  isFree: boolean;
  status: EventStatus;
  ticketUrl: string;
  featured: boolean;
};

type Override = {
  show_id: string;
  hidden: boolean | null; // null = decide la regla automática; true/false = decisión manual
  featured: boolean;
  description: string | null;
};

/**
 * La ticketera del Rosita Ávila también vende eventos en otros lugares, y la API no trae el lugar.
 * Si el título o la sinopsis nombran otra sede (o es online), se asume que no es en el teatro.
 * Se puede corregir caso por caso con `hidden` en Supabase.
 */
const OTHER_VENUE =
  /hip[oó]dromo|streaming|en vivo online|transmisi[oó]n online|virtual|estadio|palacio de los deportes|anfiteatro|parque 9 de julio|plaza independencia/i;

function isAtTheater(show: AplausosShow) {
  return !OTHER_VENUE.test([show.showNameLine1, show.showNameLine2, show.synopsis].filter(Boolean).join(" "));
}

// unstable_cache serializa a JSON: se cachea el array y el Map se arma afuera.
const fetchOverrides = unstable_cache(
  async (): Promise<Override[]> => {
    if (!supabase) return [];
    const { data, error } = await supabase.from("event_overrides").select("show_id, hidden, featured, description");
    if (error) {
      console.error("Supabase event_overrides:", error.message);
      return [];
    }
    return data as Override[];
  },
  ["event-overrides"],
  { revalidate: REVALIDATE_SECONDS, tags: ["event-overrides"] },
);

const getOverrides = async () => new Map((await fetchOverrides()).map((o) => [o.show_id, o]));

function toEvent(show: AplausosShow, override?: Override): TheaterEvent {
  const now = Date.now() - 3 * 60 * 60 * 1000; // una función sigue "vigente" hasta 3 h después de empezar

  const performances: Performance[] = show.performances
    .map((p) => {
      const raw = [...(p.sections ?? [])].sort((a, b) => a.order - b.order);
      const sections = raw.map((s) => ({
        id: s.sectionId,
        name: s.name,
        price: s.price,
        available: s.onSale && !s.markedAsSoldOut,
      }));
      const status: EventStatus = sections.some((s) => s.available)
        ? "disponible"
        : raw.some((s) => s.markedAsSoldOut)
          ? "agotado"
          : "sin-venta";
      return { id: p.id, date: parseLocalDateTime(p.dateTime), sections, status };
    })
    .filter((p) => new Date(p.date).getTime() >= now)
    .sort((a, b) => a.date.localeCompare(b.date));

  const prices = performances.flatMap((p) => p.sections.map((s) => s.price));
  const minPrice = prices.length ? Math.min(...prices) : null;
  const status: EventStatus = performances.some((p) => p.status === "disponible")
    ? "disponible"
    : performances.some((p) => p.status === "agotado")
      ? "agotado"
      : "sin-venta";

  return {
    id: show.id,
    slug: `${slugify(show.showNameLine1)}-${show.id.slice(0, 8)}`,
    title: show.showNameLine1.trim(),
    subtitle: show.showNameLine2?.trim() || null,
    image: show.imagePath,
    synopsis: override?.description?.trim() || show.synopsis?.trim() || null,
    performances,
    nextDate: performances[0]?.date ?? null,
    minPrice,
    isFree: minPrice === 0,
    status,
    ticketUrl: ticketUrl(show.id),
    featured: override?.featured ?? false,
  };
}

/** Cartelera del teatro: sólo shows en la sala, sin los ocultados desde el admin, ordenados por fecha. */
export async function getEvents(): Promise<TheaterEvent[]> {
  try {
    const [shows, overrides] = await Promise.all([listShows(), getOverrides()]);
    const candidates = shows.filter((s) => overrides.get(s.id)?.hidden !== true);
    // El listado no trae precios ni sinopsis: se completa con el detalle de cada show.
    const detailed = await Promise.all(candidates.map((s) => getShow(s.id).catch(() => s)));
    return detailed
      .filter((s) => overrides.get(s.id)?.hidden === false || isAtTheater(s))
      .map((s) => toEvent(s, overrides.get(s.id)))
      .filter((e) => e.nextDate)
      .sort((a, b) => a.nextDate!.localeCompare(b.nextDate!));
  } catch (err) {
    console.error("No se pudo cargar la cartelera:", err);
    return [];
  }
}

export async function getEventBySlug(slug: string) {
  const events = await getEvents();
  return events.find((e) => e.slug === slug) ?? null;
}

export function pickFeatured(events: TheaterEvent[]) {
  return events.find((e) => e.featured) ?? events.find((e) => e.status === "disponible") ?? events[0] ?? null;
}
