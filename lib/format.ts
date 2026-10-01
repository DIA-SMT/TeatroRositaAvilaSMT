const TZ = "America/Argentina/Tucuman";

const dateFmt = new Intl.DateTimeFormat("es-AR", {
  timeZone: TZ,
  weekday: "long",
  day: "numeric",
  month: "long",
});
const shortDateFmt = new Intl.DateTimeFormat("es-AR", {
  timeZone: TZ,
  weekday: "short",
  day: "numeric",
  month: "short",
});
const timeFmt = new Intl.DateTimeFormat("es-AR", {
  timeZone: TZ,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
const dayFmt = new Intl.DateTimeFormat("es-AR", { timeZone: TZ, day: "2-digit" });
const monthFmt = new Intl.DateTimeFormat("es-AR", { timeZone: TZ, month: "short" });
const monthKeyFmt = new Intl.DateTimeFormat("es-AR", { timeZone: TZ, month: "long", year: "numeric" });
const priceFmt = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

/** La API devuelve horarios locales sin zona ("2026-10-03T21:00:00"); son hora argentina. */
export function parseLocalDateTime(value: string) {
  return new Date(/[zZ]|[+-]\d\d:\d\d$/.test(value) ? value : `${value}-03:00`).toISOString();
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const formatDate = (iso: string) => capitalize(dateFmt.format(new Date(iso)));
export const formatShortDate = (iso: string) => capitalize(shortDateFmt.format(new Date(iso)).replace(/\./g, ""));
export const formatTime = (iso: string) => `${timeFmt.format(new Date(iso))} hs`;
export const formatDay = (iso: string) => dayFmt.format(new Date(iso));
export const formatMonth = (iso: string) => monthFmt.format(new Date(iso)).replace(".", "").toUpperCase();
export const formatMonthKey = (iso: string) => capitalize(monthKeyFmt.format(new Date(iso)));
export const formatPrice = (value: number) => priceFmt.format(value);
