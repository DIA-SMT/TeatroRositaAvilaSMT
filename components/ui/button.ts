import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-brand-500 text-foreground shadow-[0_8px_30px_-8px] shadow-brand-500/60 hover:bg-brand-400",
  accent: "bg-accent-400 text-background shadow-[0_8px_30px_-8px] shadow-accent-400/50 hover:bg-accent-300",
  outline: "border border-foreground/20 bg-foreground/5 text-foreground backdrop-blur hover:border-accent-400/60 hover:text-accent-300",
  ghost: "text-muted hover:text-foreground",
} as const;

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
} as const;

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: { variant?: keyof typeof variants; size?: keyof typeof sizes; className?: string } = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide whitespace-nowrap transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}
