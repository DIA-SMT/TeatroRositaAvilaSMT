import { Drama, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-surface/50 px-6 py-16 text-center">
      <Drama className="size-10 text-accent-400" strokeWidth={1.4} />
      <h3 className="mt-4 font-display text-2xl font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted">{text}</p>
      <a
        href={site.ticketsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ variant: "outline", size: "sm", className: "mt-6" })}
      >
        Ver entradas.smt.gob.ar <ExternalLink className="size-3.5" />
      </a>
    </div>
  );
}
