"use client";

import { MouseEvent, ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";

interface HoverGlowProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps a card and adds a soft primary-colored glow that tracks the
 * cursor and shows up as a thin ring around the card's edge on hover.
 * Position is written straight to a CSS custom property in the
 * mousemove handler (no React re-render), so tracking stays smooth.
 */
export function HoverGlow({ children, className }: HoverGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    ref.current?.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
    ref.current?.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("group/glow relative isolate", className)}
    >
      <div
        className="pointer-events-none absolute -inset-px z-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover/glow:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--glow-x, 50%) var(--glow-y, 50%), hsl(var(--primary) / 0.55), transparent 72%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
