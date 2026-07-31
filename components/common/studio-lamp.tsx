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
 * A studio LED picture light mounted above a portrait, with a physical
 * toggle switch. When switched on, the LED bar emits a soft cone of light
 * that falls across the top of the portrait and lifts it out of the dark.
 * Defaults to on.
 */
export function StudioLamp({ src, alt, className }: StudioLampProps) {
  const [on, setOn] = useState(true);

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {/* ---- Lamp fixture ---- */}
      <div className="relative z-20 flex flex-col items-center">
        {/* Ceiling stem */}
        <div className="h-8 w-[3px] rounded-full bg-gradient-to-b from-transparent to-muted-foreground/50" />
        {/* Mounting knuckle */}
        <div className="h-2.5 w-2.5 rounded-full border border-border bg-muted-foreground/40" />
        {/* Housing */}
        <div className="relative -mt-[3px] w-56 sm:w-72">
          <div className="h-3.5 rounded-t-md bg-gradient-to-b from-slate-500 to-slate-700 shadow-md dark:from-slate-600 dark:to-slate-800" />
          {/* Diffuser / LED strip */}
          <div
            className={cn(
              "h-2 rounded-b-sm transition-all duration-500",
              on ? "bg-amber-100" : "bg-slate-600 dark:bg-slate-700"
            )}
            style={
              on
                ? { boxShadow: "0 0 26px 8px hsl(45 100% 80% / 0.85)" }
                : undefined
            }
          />
        </div>
      </div>

      {/* ---- Light cone ---- */}
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-[3.4rem] z-10 h-[26rem] w-[34rem] -translate-x-1/2 transition-opacity duration-700",
          on ? "opacity-100" : "opacity-0"
        )}
        style={{
          background:
            "linear-gradient(180deg, hsl(45 100% 85% / 0.5) 0%, hsl(45 100% 85% / 0.16) 45%, transparent 88%)",
          clipPath: "polygon(41% 0%, 59% 0%, 100% 100%, 0% 100%)",
          filter: "blur(6px)",
        }}
        aria-hidden="true"
      />

      {/* ---- Portrait ---- */}
      <div className="relative z-10 mt-8 w-[19rem] sm:w-[24rem] lg:w-[27rem]">
        {/* Ambient bloom behind the frame */}
        <div
          className={cn(
            "absolute -inset-6 rounded-3xl blur-3xl transition-opacity duration-700",
            on ? "opacity-100" : "opacity-0"
          )}
          style={{ background: "hsl(45 100% 75% / 0.28)" }}
          aria-hidden="true"
        />
        <div
          className={cn(
            "relative overflow-hidden rounded-xl border transition-all duration-700",
            on
              ? "border-primary/60 shadow-2xl shadow-primary/25"
              : "border-border shadow-lg"
          )}
        >
          <Image
            src={src}
            width={540}
            height={675}
            sizes="(max-width: 640px) 90vw, 27rem"
            className={cn(
              "aspect-[4/5] w-full object-cover transition-all duration-700",
              on ? "brightness-105 saturate-100" : "brightness-[0.45] saturate-50"
            )}
            alt={alt}
            priority
          />
          {/* Warm falloff washing down from the lit top edge */}
          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 top-0 h-2/3 transition-opacity duration-700",
              on ? "opacity-100" : "opacity-0"
            )}
            style={{
              background:
                "linear-gradient(180deg, hsl(45 100% 88% / 0.4), transparent 78%)",
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* ---- Switch ---- */}
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label="Toggle the portrait light"
        onClick={() => setOn((v) => !v)}
        className="group relative z-20 mt-6 flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 shadow-sm transition-colors hover:border-primary/50"
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
