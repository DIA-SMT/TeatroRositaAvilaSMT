import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-surface">
      <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-accent-400/60 to-transparent" />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] md:gap-12 md:py-16 lg:px-8">
        <div className="col-span-2 space-y-5 md:col-span-1">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted">{site.description}</p>
          <div className="flex items-center gap-3">
            <Image src="/logoMuni-sm.png" alt="Municipalidad de San Miguel de Tucumán" width={36} height={36} />
            <span className="text-xs leading-tight text-muted">
              Municipalidad de
              <br />
              San Miguel de Tucumán
            </span>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold tracking-[0.25em] text-accent-400 uppercase">Navegación</h2>
          <ul className="space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.ticketsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-foreground"
              >
                Venta de entradas <ExternalLink className="size-3.5" />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold tracking-[0.25em] text-accent-400 uppercase">Contacto</h2>
          <ul className="space-y-3 text-sm text-muted">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent-400" />
              <span>{site.address ?? site.city}</span>
            </li>
            <li>
              <a href={site.phone.href} className="flex gap-3 transition-colors hover:text-foreground">
                <Phone className="mt-0.5 size-4 shrink-0 text-accent-400" />
                {site.phone.label}
              </a>
            </li>
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="flex gap-3 transition-colors hover:text-foreground">
                  <Mail className="mt-0.5 size-4 shrink-0 text-accent-400" />
                  {site.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {site.name} · Municipalidad de San Miguel de Tucumán
        </p>
      </div>
    </footer>
  );
}
