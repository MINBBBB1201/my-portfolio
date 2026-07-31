"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";

import { HudCorners } from "@/components/common/hud-corners";
import { cn } from "@/lib/utils";

interface StudioLampProps {
  src: StaticImageData;
  alt: string;
  className?: string;
}

/**
 * A machined-aluminium LED picture light mounted on twin arms above a
 * portrait, with a panel-style rocker switch. Styled to match the site's
 * blueprint / instrumentation identity: cool primary-hued light, milled
 * housing, vent slots, and a monospace status readout.
 */
export function StudioLamp({ src, alt, className }: StudioLampProps) {
  const [on, setOn] = useState(true);

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {/* ---------- Fixture ---------- */}
      <div className="relative z-20 flex w-[15rem] flex-col items-center sm:w-[17rem]">
        {/* Twin mounting arms */}
        <div className="flex h-9 w-[62%] items-start justify-between">
          <span className="h-9 w-[2px] origin-top rotate-[9deg] rounded-full bg-gradient-to-b from-transparent via-slate-400/70 to-slate-500 dark:via-slate-500/70 dark:to-slate-400/80" />
          <span className="h-9 w-[2px] origin-top -rotate-[9deg] rounded-full bg-gradient-to-b from-transparent via-slate-400/70 to-slate-500 dark:via-slate-500/70 dark:to-slate-400/80" />
        </div>

        {/* Housing */}
        <div className="relative -mt-[2px] w-full">
          {/* Milled top shell */}
          <div className="relative h-4 rounded-t-[5px] bg-gradient-to-b from-slate-300 via-slate-400 to-slate-600 shadow-md dark:from-slate-500 dark:via-slate-600 dark:to-slate-800">
            {/* Vent slots */}
            <div className="absolute inset-x-0 top-[5px] flex justify-center gap-[3px]">
              {Array.from({ length: 22 }).map((_, i) => (
                <span
                  key={i}
                  className="h-[5px] w-[2px] rounded-sm bg-slate-700/35 dark:bg-slate-900/50"
                />
              ))}
            </div>
            {/* Power indicator */}
            <span
              className={cn(
                "absolute right-2 top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full transition-colors duration-500",
                on ? "bg-primary" : "bg-slate-600/60"
              )}
              style={
                on
                  ? { boxShadow: "0 0 6px 1px hsl(var(--primary) / 0.9)" }
                  : undefined
              }
            />
          </div>

          {/* Reflector lip */}
          <div className="h-[3px] bg-gradient-to-b from-slate-600 to-slate-500 dark:from-slate-800 dark:to-slate-700" />

          {/* Diffuser / emitter */}
          <div
            className={cn(
              "h-[7px] rounded-b-[4px] transition-all duration-500",
              on
                ? "bg-gradient-to-b from-white to-primary/70"
                : "bg-slate-500/70 dark:bg-slate-700"
            )}
            style={
              on
                ? {
                    boxShadow:
                      "0 0 22px 5px hsl(var(--primary) / 0.65), 0 4px 30px 10px hsl(var(--primary) / 0.35)",
                  }
                : undefined
            }
          />
        </div>
      </div>

      {/* ---------- Light cone ---------- */}
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-[3.2rem] z-10 h-[24rem] w-[30rem] -translate-x-1/2 transition-opacity duration-700",
          on ? "opacity-100" : "opacity-0"
        )}
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--primary) / 0.4) 0%, hsl(var(--primary) / 0.12) 48%, transparent 88%)",
          clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
          filter: "blur(7px)",
        }}
        aria-hidden="true"
      />

      {/* ---------- Portrait ---------- */}
      <div className="relative z-10 mt-7 w-[15rem] sm:w-[17.5rem]">
        <div
          className={cn(
            "absolute -inset-5 rounded-3xl blur-3xl transition-opacity duration-700",
            on ? "opacity-100" : "opacity-0"
          )}
          style={{ background: "hsl(var(--primary) / 0.22)" }}
          aria-hidden="true"
        />
        <div
          className={cn(
            "relative overflow-hidden rounded-lg border transition-all duration-700",
            on
              ? "border-primary/60 shadow-2xl shadow-primary/25"
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
              on ? "brightness-105" : "brightness-[0.5] saturate-50"
            )}
            alt={alt}
            priority
          />
          {/* Falloff washing down from the lit top edge */}
          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 top-0 h-2/3 transition-opacity duration-700",
              on ? "opacity-100" : "opacity-0"
            )}
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--primary) / 0.3), transparent 76%)",
            }}
            aria-hidden="true"
          />
        </div>
        <HudCorners size="sm" className="absolute -inset-2.5" />
      </div>

      {/* ---------- Panel switch ---------- */}
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label="Toggle the portrait light"
        onClick={() => setOn((v) => !v)}
        className="group relative z-20 mt-6 flex items-center gap-2.5 rounded-md border border-border bg-card px-3 py-1.5 shadow-sm transition-colors hover:border-primary/60"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
          Lamp
        </span>
        <span
          className={cn(
            "relative h-4 w-8 rounded-sm border transition-colors duration-300",
            on ? "border-primary/50 bg-primary/20" : "border-border bg-muted"
          )}
        >
          <span
            className={cn(
              "absolute top-[1px] h-[12px] w-[14px] rounded-[2px] transition-all duration-300",
              on
                ? "left-[17px] bg-primary"
                : "left-[1px] bg-muted-foreground/50"
            )}
          />
        </span>
        <span
          className={cn(
            "font-mono text-[9px] uppercase tracking-[0.22em] transition-colors duration-300",
            on ? "text-primary" : "text-muted-foreground/60"
          )}
        >
          {on ? "On" : "Off"}
        </span>
      </button>
    </div>
  );
}
