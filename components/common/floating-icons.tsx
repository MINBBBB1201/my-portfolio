import { CSSProperties } from "react";
import { Cpu, Gauge, Plane, Radar, Rocket, Wind } from "lucide-react";

import { cn } from "@/lib/utils";

interface FloatingIconsProps {
  className?: string;
}

const ITEMS = [
  { Icon: Rocket, top: "10%", left: "6%", size: "h-10 w-10", rot: "-12deg", delay: "0s", duration: "7s" },
  { Icon: Cpu, top: "18%", left: "90%", size: "h-8 w-8", rot: "8deg", delay: "0.6s", duration: "8s" },
  { Icon: Wind, top: "78%", left: "8%", size: "h-9 w-9", rot: "10deg", delay: "1.2s", duration: "9s" },
  { Icon: Gauge, top: "82%", left: "92%", size: "h-8 w-8", rot: "-6deg", delay: "0.3s", duration: "7.5s" },
  { Icon: Plane, top: "46%", left: "2%", size: "h-7 w-7", rot: "38deg", delay: "1s", duration: "8.5s" },
  { Icon: Radar, top: "40%", left: "95%", size: "h-9 w-9", rot: "-10deg", delay: "1.6s", duration: "9.5s" },
] as const;

/**
 * Ambient scatter of low-opacity engineering/aviation icons used as
 * background decoration behind hero/section content. Rotation + drift
 * are applied via inline `animation`/CSS custom property (not Tailwind
 * arbitrary classes), so they render correctly without relying on
 * Tailwind's static class scanning.
 */
export function FloatingIcons({ className }: FloatingIconsProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {ITEMS.map(({ Icon, top, left, size, rot, delay, duration }, i) => (
        <Icon
          key={i}
          className={cn("absolute text-primary/10", size)}
          strokeWidth={1.25}
          style={
            {
              top,
              left,
              "--rot": rot,
              animation: `float ${duration} ease-in-out ${delay} infinite`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
