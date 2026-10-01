"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, MapPin, Phone, Ticket } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import logoRA from "@/public/logo-ra-256.webp";
import { CURTAIN_CLOSE_PX as CLOSE_PX, CURTAIN_OPEN_PX as OPEN_PX } from "@/lib/curtain";
import { nav, site } from "@/lib/site";

const MIN_CLOSE_PX = 150; // páginas demasiado cortas: no se cierra

/**
 * Telón fijo sobre todo el sitio, controlado por el scroll.
 * --p va de 0 (abierto: quedan las cortinas finas a los costados) a 1 (cerrado).
 * En la home arranca cerrado y se abre con los primeros scrolls; en todas las páginas se cierra al llegar al final.
 * El header queda por encima; el footer queda tapado al cerrarse, así que sus datos se repiten sobre el telón.
 */
export function CurtainStage() {
  const pathname = usePathname();
  const intro = pathname === "/";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const openDist = intro && !reduced ? Math.min(OPEN_PX, max / 2) : 0;
      const closeDist = reduced ? 0 : Math.min(CLOSE_PX, max - openDist);

      let p = 0;
      let phase = "open";
      if (openDist > 0 && y < openDist) {
        p = 1 - y / openDist;
        phase = "intro";
      } else if (closeDist >= MIN_CLOSE_PX && y > max - closeDist) {
        p = (y - (max - closeDist)) / closeDist;
        phase = "outro";
      }
      p = Math.min(1, Math.max(0, p));

      el.style.setProperty("--p", p.toFixed(4));
      el.dataset.phase = phase;
      el.dataset.state = p > 0.5 ? "closed" : "open";
      if (p < 0.05 && !el.dataset.opened) {
        el.dataset.opened = "true";
        window.dispatchEvent(new Event("curtain:opened"));
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    if (!intro || reduced) {
      el.dataset.opened = "true";
      window.dispatchEvent(new Event("curtain:opened"));
    } else {
      delete el.dataset.opened; // volver a la home desde otra página: el telón arranca cerrado otra vez
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule); // el alto cambia al cargar imágenes y datos
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, [intro]);

  const openCurtain = () => window.scrollTo({ top: OPEN_PX, behavior: "smooth" });

  return (
    <div
      ref={ref}
      id="curtain"
      data-phase={intro ? "intro" : "open"}
      data-state={intro ? "closed" : "open"}
      style={{ "--p": intro ? 1 : 0 } as React.CSSProperties}
      className="group/curtain pointer-events-none fixed inset-0 z-40"
    >
      {/* Mitades del telón. Abiertas quedan como una franja fina a cada costado. */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-[calc(50%+1px)] translate-x-[calc((var(--p)-1)*(100%-var(--drape)))] bg-curtain shadow-[inset_-50px_0_70px_-20px_rgb(0_0_0/0.85),12px_0_30px_rgb(0_0_0/0.45)] will-change-transform [--drape:12px] sm:[--drape:28px] lg:[--drape:44px]"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-[calc(50%+1px)] translate-x-[calc((1-var(--p))*(100%-var(--drape)))] bg-curtain shadow-[inset_50px_0_70px_-20px_rgb(0_0_0/0.85),-12px_0_30px_rgb(0_0_0/0.45)] will-change-transform [--drape:12px] sm:[--drape:28px] lg:[--drape:44px]"
      />
      {/* Bambalina: sólo se ve con el telón cerrándose */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-24 bg-curtain opacity-[var(--p)] shadow-[0_16px_30px_-8px_rgb(0_0_0/0.7)] [mask-image:radial-gradient(70%_100%_at_50%_0%,black_60%,transparent_61%)]"
      />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(7_11_22/0.5),transparent_70%)] opacity-[var(--p)]" />

      {/* Telón cerrado al cargar la home */}
      <div className="absolute inset-0 hidden flex-col items-center justify-center px-6 text-center opacity-[clamp(0,calc((var(--p)-0.55)*2.5),1)] group-data-[phase=intro]/curtain:flex group-data-[state=closed]/curtain:pointer-events-auto">
        <Image
          src={logoRA}
          alt=""
          width={96}
          height={96}
          priority
          className="mb-6 size-20 rounded-2xl shadow-2xl shadow-black/50 sm:size-24"
        />
        <p className="text-xs font-semibold tracking-[0.4em] text-accent-300 uppercase">Teatro Municipal</p>
        <p className="mt-3 font-display text-5xl font-semibold sm:text-7xl">
          Rosita <span className="text-accent-gradient italic">Ávila</span>
        </p>
        <p className="mt-4 text-foreground/75">{site.city}</p>
        <button
          type="button"
          onClick={openCurtain}
          className="mt-14 flex flex-col items-center gap-2 text-sm text-accent-200/90 transition-colors hover:text-accent-200"
        >
          Deslizá para abrir el telón
          <ChevronDown className="size-6 animate-bounce" />
        </button>
      </div>

      {/* Telón cerrado al final de la página: tapa todo (también el footer), así que lleva los "créditos" */}
      <div className="absolute inset-0 hidden flex-col items-center justify-center px-6 pt-20 pb-6 text-center opacity-[clamp(0,calc((var(--p)-0.65)*3),1)] group-data-[phase=outro]/curtain:flex group-data-[state=closed]/curtain:pointer-events-auto">
        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="text-xs font-semibold tracking-[0.35em] text-accent-300 uppercase">Fin de la función</p>
          <p className="mt-3 font-display text-3xl leading-tight font-semibold text-balance sm:text-5xl">Gracias por acompañarnos</p>
          <p className="mt-3 text-foreground/75">Te esperamos en la próxima función.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/eventos" className={buttonVariants({ variant: "accent" })}>
              Ver cartelera <ArrowRight className="size-4" />
            </Link>
            <a href={site.ticketsUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" })}>
              <Ticket className="size-4" /> Comprar entradas
            </a>
          </div>
        </div>

        <div className="w-full max-w-3xl space-y-4 border-t border-foreground/15 pt-5 text-sm text-foreground/75">
          <nav aria-label="Secundaria" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4 text-accent-300" /> {site.address ?? site.city}
            </span>
            <a href={site.phone.href} className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Phone className="size-4 text-accent-300" /> {site.phone.label}
            </a>
          </div>
          <p className="flex items-center justify-center gap-2 text-xs text-foreground/60">
            <Image src="/logoMuni-sm.png" alt="" width={20} height={20} />© {new Date().getFullYear()} {site.name} · Municipalidad de{" "}
            {site.city}
          </p>
        </div>
      </div>
    </div>
  );
}
