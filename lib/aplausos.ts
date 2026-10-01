import "server-only";

/**
 * Cliente de la API de Aplausos, la ticketera detrás de entradas.smt.gob.ar.
 * No es una API documentada: el tenant (Teatro Rosita Ávila) se resuelve por el header Origin,
 * y el CORS sólo permite ese origen, así que se consume únicamente desde el servidor.
 */
const API_URL = process.env.APLAUSOS_API_URL ?? "https://onlinesales-api.aplausos.com.ar";
const TENANT_ORIGIN = process.env.APLAUSOS_TENANT_ORIGIN ?? "https://entradas.smt.gob.ar";
export const REVALIDATE_SECONDS = 300;

export type AplausosSection = {
  sectionId: string;
  name: string;
  price: number;
  order: number;
  onSale: boolean;
  markedAsSoldOut: boolean;
};

export type AplausosPerformance = {
  id: string;
  dateTime: string;
  sections?: AplausosSection[];
};

export type AplausosShow = {
  id: string;
  showNameLine1: string;
  showNameLine2: string | null;
  imagePath: string | null;
  hallImagePath: string | null;
  synopsis?: string | null;
  sendsDigitalTickets?: boolean;
  isListedOnline?: boolean;
  performances: AplausosPerformance[];
};

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { Origin: TENANT_ORIGIN, Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS, tags: ["shows"] },
  });
  if (!res.ok) throw new Error(`Aplausos ${path} respondió ${res.status}`);
  return res.json() as Promise<T>;
}

export const listShows = () => request<AplausosShow[]>("/shows");
export const getShow = (id: string) => request<AplausosShow>(`/shows/${encodeURIComponent(id)}`);

export const ticketUrl = (showId: string) => `${TENANT_ORIGIN}/shows/${showId}`;
