import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="text-xs font-semibold tracking-[0.35em] text-accent-400 uppercase">Error 404</p>
      <h1 className="mt-4 font-display text-5xl font-semibold sm:text-6xl">
        Esta función <span className="text-accent-gradient italic">ya terminó</span>
      </h1>
      <p className="mt-4 max-w-md text-muted">La página que buscás no existe o el evento ya no está en cartelera.</p>
      <Link href="/eventos" className={buttonVariants({ variant: "accent", className: "mt-8" })}>
        Ver la cartelera
      </Link>
    </section>
  );
}
