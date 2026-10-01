import Link from "next/link";
import { Drama } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("group flex items-center gap-3", className)}
      aria-label="Teatro Rosita Ávila, inicio"
    >
      <span className="grid size-10 place-items-center rounded-full border border-accent-400/50 bg-brand-700/40 text-accent-300 transition-colors group-hover:bg-brand-600/60">
        <Drama className="size-5" strokeWidth={1.6} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[10px] font-medium tracking-[0.35em] text-accent-400 uppercase">Teatro Municipal</span>
        <span className="font-display text-xl font-semibold">Rosita Ávila</span>
      </span>
    </Link>
  );
}
