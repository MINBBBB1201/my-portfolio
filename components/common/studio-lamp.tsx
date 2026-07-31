"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface StudioLampProps {
  src: StaticImageData;
  alt: string;
  className?: string;
}

/**
 * A single slim LED bar suspended above the portrait, with a soft toggle.
 * Deliberately minimal — one thin emitter, one diffuse wash of light, no
 * housing detail — so the effect reads as lighting rather than as an
 * illustrated object.
 */
export function StudioLamp({ src, alt, className }: StudioLampProps) {
  const [on, setOn] = useState(true);

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {/* ---------- LED bar ---------- */}
      <div
        className={cn(
          "relative z-20 h-[3px] w-[11rem] rounded-full transition-all duration-500 sm:w-[13rem]",
          on ? "bg-primary" : "bg-muted-foreground/25"
        )}
        style={
          on
            ? {
                boxShadow:
                  "0 0 12px 1px hsl(var(--primary) / 0.75), 0 0 40px 10px hsl(var(--primary) / 0.3)",
              }
            : undefined
        }
        aria-hidden="true"
      />

      {/* ---------- Diffuse wash of light (soft-edged, no hard cone) ---------- */}
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-0 z-0 h-[26rem] w-[30rem] -translate-x-1/2 transition-opacity duration-700",
          on ? "opacity-100" : "opacity-0"
        )}
        style={{
          background:
            "radial-gradient(ellipse 42% 58% at 50% 0%, hsl(var(--primary) / 0.28), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ---------- Portrait ---------- */}
      <div className="relative z-10 mt-9 w-[15rem] sm:w-[17.5rem]">
        <div
          className={cn(
            "relative overflow-hidden rounded-lg border transition-all duration-700",
            on
              ? "border-primary/40 shadow-2xl shadow-primary/20"
              : "border-border shadow-md"
          )}
        >
          <Image
            src={src}
            width={420}
            height={525}
            sizes="(max-width: 640px) 60vw, 17.5rem"
            className={cn(
              "aspect-[4/5] w-full object-cover transition-all duration-700",
              on ? "brightness-105" : "brightness-[0.55] saturate-50"
            )}
            alt={alt}
            priority
          />
          {/* Light falling across the top of the portrait */}
          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 top-0 h-1/2 transition-opacity duration-700",
              on ? "opacity-100" : "opacity-0"
            )}
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--primary) / 0.22), transparent 82%)",
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* ---------- Toggle ---------- */}
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label="Toggle the portrait light"
        onClick={() => setOn((v) => !v)}
        className="relative z-20 mt-7 flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 shadow-sm transition-colors hover:border-primary/50"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Light
        </span>
        <span
          className={cn(
            "relative h-5 w-9 rounded-full transition-colors duration-300",
            on ? "bg-primary" : "bg-muted-foreground/30"
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all duration-300",
              on ? "left-[1.125rem]" : "left-0.5"
            )}
          />
        </span>
      </button>
    </div>
  );
}
