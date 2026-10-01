"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import fachadaAtardecer from "@/public/hero/fachada-atardecer.webp";
import fachadaNoche from "@/public/hero/fachada-noche.webp";
import salaEscenario from "@/public/hero/sala-escenario.webp";
import salaPublico from "@/public/hero/sala-publico.webp";
import { cn } from "@/lib/utils";

// Siempre arranca con la fachada; después alterna sala / fachada.
const slides = [fachadaAtardecer, salaEscenario, fachadaNoche, salaPublico];

const INTERVAL_MS = 7000;

export function HeroSlideshow() {
  const [{ active, prev }, setState] = useState({ active: 0, prev: -1 });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const next = () => setState((s) => ({ active: (s.active + 1) % slides.length, prev: s.active }));
    let start: ReturnType<typeof setTimeout>;
    // La fachada es lo primero que se ve al abrir el telón; recién después empieza a rotar.
    const begin = () => {
      start = setTimeout(() => {
        next();
        interval = setInterval(next, INTERVAL_MS);
      }, INTERVAL_MS);
    };
    if (document.getElementById("curtain")?.dataset.opened) begin();
    else window.addEventListener("curtain:opened", begin, { once: true });
    return () => {
      window.removeEventListener("curtain:opened", begin);
      clearTimeout(start);
      clearInterval(interval);
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 -z-30 overflow-hidden bg-background">
      {slides.map((src, i) => (
        <Image
          key={src.src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          placeholder="blur"
          sizes="100vw"
          className={cn(
            "object-cover transition-opacity duration-[1800ms] ease-in-out",
            // Ken Burns: la imagen activa se acerca despacio; la saliente conserva el zoom mientras se desvanece.
            i === active || i === prev ? "curtain-reveal animate-ken-burns" : "",
            i === active ? "opacity-90" : "opacity-0",
          )}
        />
      ))}
    </div>
  );
}
