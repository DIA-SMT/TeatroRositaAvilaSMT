// Datos institucionales del teatro. Los marcados con TODO faltan confirmar con la Municipalidad.
export const site = {
  name: "Teatro Rosita Ávila",
  shortName: "Rosita Ávila",
  city: "San Miguel de Tucumán",
  description:
    "Cartelera oficial del Teatro Municipal Rosita Ávila. Teatro, música, humor y espectáculos para toda la familia en San Miguel de Tucumán.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ticketsUrl: "https://entradas.smt.gob.ar",
  // TODO: confirmar dirección exacta del teatro.
  address: null as string | null,
  mapsQuery: "Teatro Rosita Ávila, San Miguel de Tucumán, Tucumán",
  phone: { label: "(0381) 420-0338", href: "tel:+543814200338" },
  // TODO: confirmar mail y redes oficiales del teatro.
  email: null as string | null,
  social: {
    instagram: null as string | null,
    facebook: null as string | null,
  },
} as const;

export const nav = [
  { href: "/", label: "Inicio" },
  { href: "/eventos", label: "Cartelera" },
  { href: "/el-teatro", label: "El Teatro" },
  { href: "/contacto", label: "Contacto" },
] as const;
