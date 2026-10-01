import { MapPin, Navigation, Phone } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";

export function LocationSection() {
  const query = encodeURIComponent(site.mapsQuery);

  return (
    <section id="como-llegar" className="scroll-mt-24 py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:px-8">
        <div>
          <SectionHeading eyebrow="Cómo llegar" title="Te esperamos en la sala" />
          <ul className="mt-8 space-y-4 text-muted">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-accent-400" />
              <span>{site.address ?? `${site.name}, ${site.city}`}</span>
            </li>
            <li>
              <a href={site.phone.href} className="flex gap-3 transition-colors hover:text-foreground">
                <Phone className="mt-0.5 size-5 shrink-0 text-accent-400" />
                {site.phone.label}
              </a>
            </li>
          </ul>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${query}`}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", className: "mt-8" })}
          >
            <Navigation className="size-4" />
            Abrir en Google Maps
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/40">
          <iframe
            title={`Mapa de ubicación del ${site.name}`}
            src={`https://www.google.com/maps?q=${query}&output=embed`}
            className="aspect-[4/3] w-full grayscale-[0.6] invert-[0.92] hue-rotate-180 sm:aspect-[16/10]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
