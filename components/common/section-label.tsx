import { cn } from "@/lib/utils";

interface SectionLabelProps {
  index: string;
  label: string;
  align?: "center" | "left";
  className?: string;
}

/**
 * Blueprint-style "sheet index" label rendered above section headings,
 * e.g. "01 — ABOUT". Purely visual, reinforces the technical-drawing
 * identity used throughout the site.
 */
export function SectionLabel({
  index,
  label,
  align = "center",
  className,
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "mb-2 flex items-center gap-3 font-mono text-xs tracking-[0.3em]",
        align === "center" ? "justify-center" : "justify-center sm:justify-start",
        className
      )}
    >
      <span className="text-primary">{index}</span>
      <span className="h-px w-10 bg-primary/40" aria-hidden="true" />
      <span className="uppercase text-muted-foreground">{label}</span>
    </div>
  );
}
