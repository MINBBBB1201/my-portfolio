import { cn } from "@/lib/utils";

interface TechBackdropProps {
  className?: string;
}

/**
 * Large-scale technical backdrop: orbital mechanics rings, an airfoil
 * cross-section with streamlines, a neural-network graph, and physics
 * notation — drawn as low-opacity line art so it reads as engineering
 * drafting paper rather than clip art. Purely decorative.
 */
export function TechBackdrop({ className }: TechBackdropProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {/* --- Orbital system, upper left --- */}
      <svg
        className="absolute -left-24 -top-16 h-[34rem] w-[34rem] text-primary/[0.13]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="26" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="200" cy="200" rx="120" ry="60" stroke="currentColor" strokeWidth="1.5" />
        <ellipse
          cx="200"
          cy="200"
          rx="165"
          ry="82"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          transform="rotate(38 200 200)"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="190"
          ry="96"
          stroke="currentColor"
          strokeWidth="1"
          transform="rotate(-25 200 200)"
        />
        <circle cx="320" cy="200" r="5" fill="currentColor" />
        <circle cx="118" cy="132" r="4" fill="currentColor" />
      </svg>

      {/* --- Airfoil with streamlines, lower left --- */}
      <svg
        className="absolute -left-10 bottom-4 h-56 w-[26rem] text-primary/[0.14]"
        viewBox="0 0 420 220"
        fill="none"
      >
        <path
          d="M40 130 C120 84, 250 78, 360 110 C250 128, 120 148, 40 130 Z"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path d="M0 74 C130 44, 260 40, 420 66" stroke="currentColor" strokeWidth="1" />
        <path d="M0 96 C130 62, 260 58, 420 88" stroke="currentColor" strokeWidth="1" />
        <path d="M0 160 C130 172, 260 164, 420 138" stroke="currentColor" strokeWidth="1" />
        <path d="M0 184 C130 198, 260 190, 420 160" stroke="currentColor" strokeWidth="1" />
        <path
          d="M40 130 L360 110"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="5 6"
        />
      </svg>

      {/* --- Neural network graph, right --- */}
      <svg
        className="absolute -right-16 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 text-primary/[0.13]"
        viewBox="0 0 320 320"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="1">
          {[70, 130, 190, 250].map((y1) =>
            [50, 110, 170, 230, 290].map((y2) => (
              <line key={`a${y1}-${y2}`} x1="50" y1={y1} x2="160" y2={y2} />
            ))
          )}
          {[50, 110, 170, 230, 290].map((y1) =>
            [100, 160, 220].map((y2) => (
              <line key={`b${y1}-${y2}`} x1="160" y1={y1} x2="270" y2={y2} />
            ))
          )}
        </g>
        <g fill="currentColor">
          {[70, 130, 190, 250].map((y) => (
            <circle key={`n1${y}`} cx="50" cy={y} r="6" />
          ))}
          {[50, 110, 170, 230, 290].map((y) => (
            <circle key={`n2${y}`} cx="160" cy={y} r="6" />
          ))}
          {[100, 160, 220].map((y) => (
            <circle key={`n3${y}`} cx="270" cy={y} r="6" />
          ))}
        </g>
      </svg>

      {/* --- Physics / propulsion notation --- */}
      <span className="absolute left-[8%] top-[26%] font-mono text-sm text-primary/20">
        F = ṁ·Vₑ + (pₑ − p₀)Aₑ
      </span>
      <span className="absolute right-[9%] top-[16%] font-mono text-sm text-primary/20">
        L = ½ρV²S·C_L
      </span>
      <span className="absolute right-[12%] bottom-[18%] font-mono text-sm text-primary/20">
        Re = ρVL / μ
      </span>
      <span className="absolute left-[14%] bottom-[10%] font-mono text-sm text-primary/20">
        ∇·(ρu) = 0
      </span>
      <span className="absolute right-[22%] top-[46%] font-mono text-sm text-primary/20">
        ŷ = σ(Wx + b)
      </span>
    </div>
  );
}
