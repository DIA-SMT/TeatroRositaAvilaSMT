import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p
        className={cn(
          "mb-3 flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-accent-400 uppercase",
          align === "center" && "justify-center",
        )}
      >
        <span className="h-px w-8 bg-accent-400/60" />
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl leading-[1.05] font-semibold text-balance sm:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
