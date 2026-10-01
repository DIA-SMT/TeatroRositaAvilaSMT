import Link from "next/link";
import { ArrowRight, Drama, Music4, Sparkles, Ticket } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";

const features = [
  { icon: Drama, title: "Teatro y humor", text: "Obras, monólogos y stand-up de artistas locales y nacionales." },
  { icon: Music4, title: "Música en vivo", text: "Tango, folklore, rock y propuestas de la escena contemporánea." },
  { icon: Sparkles, title: "Para toda la familia", text: "Espectáculos infantiles y musicales para disfrutar en familia." },
  { icon: Ticket, title: "Entradas online", text: "Comprá desde tu celular en la plataforma oficial de la Municipalidad." },
];

export function AboutSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_50%,rgb(37_86_201/0.18),transparent_60%)]" />
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <SectionHeading
            eyebrow="El teatro"
            title={
              <>
                Una sala para la cultura <span className="text-accent-gradient italic">de la ciudad</span>
              </>
            }
            description="El Teatro Municipal Rosita Ávila es uno de los escenarios culturales de San Miguel de Tucumán, con una programación diversa abierta a todo público."
          />
          <Link href="/el-teatro" className={buttonVariants({ variant: "outline", className: "mt-8" })}>
            Conocé el teatro
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {features.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="group flex gap-4 rounded-2xl border border-border bg-surface/70 p-5 transition-colors hover:border-accent-400/40 sm:block sm:p-6"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-700/50 text-accent-300 transition-colors group-hover:bg-brand-600 sm:mb-4">
                <Icon className="size-5" strokeWidth={1.6} />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold sm:text-xl">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted sm:mt-2">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
