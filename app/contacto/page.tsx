import type { Metadata } from "next";
import { Mail, MapPin, Phone, Ticket } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Canales de contacto del ${site.name}.`,
};

export default function ContactoPage() {
  const channels = [
    { icon: Phone, label: "Teléfono", value: site.phone.label, href: site.phone.href },
    site.email && { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: Ticket, label: "Entradas", value: "entradas.smt.gob.ar", href: site.ticketsUrl },
    { icon: MapPin, label: "Dirección", value: site.address ?? site.city, href: "/el-teatro#como-llegar" },
  ].filter(Boolean) as { icon: typeof Phone; label: string; value: string; href: string }[];

  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Hablemos"
        description="¿Tenés consultas sobre una función, accesibilidad o propuestas para la sala? Escribinos o llamanos."
      />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ icon: Icon, label, value, href }) => (
            <li key={label}>
              <a
                href={href}
                {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                className="group block h-full rounded-2xl border border-border bg-surface/70 p-6 transition-colors hover:border-accent-400/50"
              >
                <span className="grid size-11 place-items-center rounded-full bg-brand-700/50 text-accent-300 transition-colors group-hover:bg-brand-600">
                  <Icon className="size-5" strokeWidth={1.6} />
                </span>
                <p className="mt-5 text-xs font-semibold tracking-[0.25em] text-accent-400 uppercase">{label}</p>
                <p className="mt-1 font-medium break-words">{value}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
