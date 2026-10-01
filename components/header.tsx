"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Ticket, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-border/80 bg-background/80 shadow-lg shadow-black/30 backdrop-blur-lg"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo onClick={() => setOpen(false)} />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-4 py-2 text-sm transition-colors after:absolute after:inset-x-4 after:-bottom-0.5 after:h-px after:origin-left after:bg-accent-400 after:transition-transform after:duration-300",
                isActive(item.href)
                  ? "text-foreground after:scale-x-100"
                  : "text-muted after:scale-x-0 hover:text-foreground hover:after:scale-x-100",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.ticketsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "primary", size: "sm", className: "hidden sm:inline-flex" })}
          >
            <Ticket className="size-4" />
            Entradas
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Panel mobile: debajo del header, ocupa el resto de la pantalla */}
      <nav
        id="mobile-nav"
        aria-label="Principal"
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto bg-background transition-[opacity,translate] duration-300 md:hidden",
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <div className="h-full">
          <ul className="flex min-h-full flex-col gap-1 px-4 pt-6 pb-10">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block border-b border-border py-4 font-display text-3xl",
                    isActive(item.href) ? "text-accent-300" : "text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-auto">
              <a
                href={site.ticketsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "primary", size: "lg", className: "w-full" })}
              >
                <Ticket className="size-5" />
                Comprar entradas
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
