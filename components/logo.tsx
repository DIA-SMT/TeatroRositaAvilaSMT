import Image from "next/image";
import Link from "next/link";
import logoRA from "@/public/logo-ra-256.webp";
import { cn } from "@/lib/utils";

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("group flex items-center gap-3", className)}
      aria-label="Teatro Rosita Ávila, inicio"
    >
      <Image
        src={logoRA}
        alt=""
        width={40}
        height={40}
        priority
        className="size-10 rounded-lg shadow-lg shadow-brand-500/30 transition-transform duration-300 group-hover:scale-105"
      />
      <span className="flex flex-col leading-none">
        <span className="text-[10px] font-medium tracking-[0.35em] text-accent-400 uppercase">Teatro Municipal</span>
        <span className="font-display text-xl font-semibold">Rosita Ávila</span>
      </span>
    </Link>
  );
}
