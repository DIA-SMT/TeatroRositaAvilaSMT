import type { EventStatus } from "@/lib/events";
import { cn } from "@/lib/utils";

export function StatusBadge({ status, isFree, className }: { status: EventStatus; isFree?: boolean; className?: string }) {
  if (status === "disponible" && !isFree) return null;

  const { label, style } =
    status === "agotado"
      ? { label: "Agotado", style: "bg-brand-600/90 text-foreground" }
      : status === "sin-venta"
        ? { label: "Próximamente", style: "bg-surface-2/90 text-accent-300 border border-accent-400/30" }
        : { label: "Gratis", style: "bg-accent-400 text-background" };

  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-[11px] font-semibold tracking-wider uppercase backdrop-blur",
        style,
        className,
      )}
    >
      {label}
    </span>
  );
}
