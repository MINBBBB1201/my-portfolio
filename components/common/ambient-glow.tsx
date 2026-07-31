import { cn } from "@/lib/utils";

interface AmbientGlowProps {
  className?: string;
}

/**
 * Ambient depth layer for the hero: a soft radial pool of primary-hued
 * light behind the subject plus a vignette that darkens the outer edges,
 * so the blueprint grid recedes and the portrait reads as lit from above.
 * No imagery — just light, which keeps the composition professional.
 */
export function AmbientGlow({ className }: AmbientGlowProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    >
      {/* Pool of light behind the subject */}
      <div
        className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--primary) / 0.14), transparent 72%)",
        }}
      />
      {/* Vignette pulling focus to the centre */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 38%, transparent 42%, hsl(var(--background) / 0.85) 100%)",
        }}
      />
    </div>
  );
}
