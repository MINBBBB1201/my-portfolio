interface HudCornersProps {
  className?: string;
}

/**
 * Decorative HUD / blueprint-style corner brackets, similar to a
 * viewfinder or targeting reticle. Purely visual — absolutely
 * positioned within a `relative` parent, non-interactive.
 */
export function HudCorners({ className }: HudCornersProps) {
  const corner = "absolute h-6 w-6 sm:h-10 sm:w-10 text-primary/40";
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      <svg
        className={`${corner} left-0 top-0`}
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          d="M2 16V4a2 2 0 0 1 2-2h12"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={`${corner} right-0 top-0`}
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          d="M38 16V4a2 2 0 0 0-2-2H24"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={`${corner} bottom-0 left-0`}
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          d="M2 24v12a2 2 0 0 0 2 2h12"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={`${corner} bottom-0 right-0`}
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          d="M38 24v12a2 2 0 0 1-2 2H24"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
