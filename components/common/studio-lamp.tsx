"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

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
  const [flicker, setFlicker] = useState(false);

  // Brief power-up flicker whenever the light switches on (including the
  // initial mount, so the lamp "boots up" once the page loads).
  useEffect(() => {
    if (!on) return;
    setFlicker(true);
    const t = setTimeout(() => setFlicker(false), 360);
    return () => clearTimeout(t);
  }, [on]);

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {/* ---------- LED bar ---------- */}
      <div
        className={cn(
          "relative z-20 h-[7px] w-[12rem] rounded-full transition-all duration-300 sm:h-2 sm:w-[14rem]",
          flicker && on && "animate-[lamp-flicker_360ms_steps(3,end)]"
        )}
        style={{
          background: on
            ? "linear-gradient(180deg, hsl(var(--primary) / 0.9) 0%, hsl(var(--primary)) 42%, hsl(var(--primary) / 0.7) 100%)"
            : "linear-gradient(180deg, hsl(var(--muted-foreground) / 0.4) 0%, hsl(var(--muted-foreground) / 0.22) 100%)",
          boxShadow: on
            ? "inset 0 1px 1px hsl(0 0% 100% / 0.55), inset 0 -1.5px 2px hsl(var(--primary) / 0.65), 0 0 14px 2px hsl(var(--primary) / 0.75), 0 0 50px 16px hsl(var(--primary) / 0.3)"
            : "inset 0 1px 1px hsl(0 0% 100% / 0.08)",
        }}
        aria-hidden="true"
      />

      {/* ---------- Diffuse wash of light (soft-edged, no hard cone) ---------- */}
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-0 z-0 h-[26rem] w-[30rem] -translate-x-1/2 transition-opacity",
          on ? "opacity-100 duration-500 delay-150" : "opacity-0 duration-300"
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
            "relative overflow-hidden rounded-lg border transition-all",
            on
              ? "border-primary/40 shadow-2xl shadow-primary/20 duration-700 delay-300"
              : "border-border shadow-md duration-300"
          )}
        >
          <Image
            src={src}
            width={420}
            height={525}
            sizes="(max-width: 640px) 60vw, 17.5rem"
            className={cn(
              "aspect-[4/5] w-full object-cover transition-all",
              on
                ? "brightness-105 duration-700 delay-300"
                : "brightness-[0.55] saturate-50 duration-300"
            )}
            alt={alt}
            priority
          />
          {/* Light falling across the top of the portrait */}
          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 top-0 h-1/2 transition-opacity",
              on
                ? "opacity-100 duration-500 delay-200"
                : "opacity-0 duration-200"
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
        className="relative z-20 mt-7 flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 shadow-sm transition-all duration-150 hover:border-primary/50 active:scale-95"
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
              "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all duration-300 ease-out",
              on ? "left-[1.125rem]" : "left-0.5"
            )}
          />
        </span>
      </button>
    </div>
  );
}
