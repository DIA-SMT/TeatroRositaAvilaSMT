import type { Metadata } from "next";
import { Accessibility, Clock, CreditCard, Ticket } from "lucide-react";
import { LocationSection } from "@/components/home/location-section";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "El Teatro",
  description: `Información, ubicación y preguntas frecuentes del ${site.name}.`,
};

// TODO: reemplazar por la historia oficial y los datos de la sala que nos pase la Municipalidad.
const faqs = [
  {
    q: "¿Dónde compro las entradas?",
    a: "Online, en entradas.smt.gob.ar. Desde cada evento de esta página te llevamos directo a la compra.",
  },
  {
    q: "¿Necesito imprimir la entrada?",
    a: "Depende del espectáculo. Al finalizar la compra la plataforma te indica cómo recibir y presentar tu entrada.",
  },
  {
    q: "¿Cuántas entradas puedo comprar?",
    a: "La plataforma permite hasta 6 entradas por compra.",
  },
  {
    q: "Tengo otra consulta, ¿a quién le pregunto?",
    a: `Podés llamarnos al ${site.phone.label}.`,
  },
];

const info = [
  { icon: Ticket, title: "Entradas", text: "Venta online en entradas.smt.gob.ar." },
  { icon: CreditCard, title: "Medios de pago", text: "Los disponibles en la plataforma de venta." },
  { icon: Clock, title: "Puntualidad", text: "Te recomendamos llegar 30 minutos antes de la función." },
  { icon: Accessibility, title: "Accesibilidad", text: "Consultá por accesos y ubicaciones especiales." },
];

export default function ElTeatroPage() {
  return (
    <>
      <PageHeader
        eyebrow="El Teatro"
        title={
          <>
            Teatro Municipal <span className="text-accent-gradient italic">Rosita Ávila</span>
          </>
        }
        description="Un espacio de la Municipalidad de San Miguel de Tucumán dedicado a las artes escénicas y la música."
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {info.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl border border-border bg-surface/70 p-6">
              <Icon className="size-6 text-accent-400" strokeWidth={1.6} />
              <h2 className="mt-4 font-display text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-3xl px-4 pt-24 sm:px-6">
        <h2 className="mb-8 text-center font-display text-4xl font-semibold">Preguntas frecuentes</h2>
        <div className="divide-y divide-border rounded-2xl border border-border bg-surface/60">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {q}
                <span className="text-2xl leading-none text-accent-400 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <LocationSection />
    </>
  );
}
