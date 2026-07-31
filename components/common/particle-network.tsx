"use client";

import { useEffect, useRef } from "react";

interface ParticleNetworkProps {
  className?: string;
  /** Rough particle count per 10,000 square px of container area. */
  density?: number;
  maxParticles?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Lightweight canvas-based particle network (dots + connecting lines that
 * fade with distance), themed off the `--primary` CSS variable so it
 * automatically matches light/dark mode. No external dependency — plain
 * canvas 2D + requestAnimationFrame. Purely decorative background layer;
 * disables animation for prefers-reduced-motion.
 */
export function ParticleNetwork({
  className,
  density = 0.05,
  maxParticles = 90,
}: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let rafId = 0;

    const primaryHsl = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim();

    function resize() {
      const rect = parent!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        Math.floor(((width * height) / 10000) * density),
        maxParticles
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }));
    }

    function frame() {
      ctx!.clearRect(0, 0, width, height);
      const maxDist = Math.min(width, height) * 0.2;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx!.strokeStyle = `hsl(${primaryHsl} / ${(0.14 * (1 - dist / maxDist)).toFixed(3)})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }

      ctx!.fillStyle = `hsl(${primaryHsl} / 0.55)`;
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(frame);
      }
    }

    resize();
    frame();

    const handleResize = () => {
      cancelAnimationFrame(rafId);
      resize();
      frame();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [density, maxParticles]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
