import type { Metadata } from "next";
import Link from "next/link";
import CargoPlanner from "@/components/demos/cargo-planner";

export const metadata: Metadata = { title: "Cargo planner demo", description: "Try the cargo-loading algorithm from my JSL internship with synthetic sample boxes.", alternates: { canonical: "/demos/cargo-planner" } };

export default function CargoPlannerPage() {
  return <article className="container max-w-6xl space-y-6 py-10 sm:py-14">
    <header className="max-w-3xl space-y-4">
      <Link href="/projects/jsl-logistics" className="text-sm text-primary underline underline-offset-4">JSL internship project</Link>
      <h1 className="font-heading text-3xl sm:text-5xl">Cargo planner demo</h1>
      <p className="leading-relaxed text-muted-foreground">Change the boxes and see what fits. This uses the actual placement algorithm from my JSL project with invented cargo, in a separate portfolio interface. Everything runs in your browser.</p>
    </header>
    <CargoPlanner />
    <section className="max-w-3xl space-y-3 border-t pt-6 text-sm leading-relaxed text-muted-foreground">
      <h2 className="font-semibold text-foreground">How the calculation works</h2>
      <p>An extreme-point heuristic tries allowed box orientations, rejects collisions and payload overflow, and requires at least 80% base support for elevated boxes. It reports the center of gravity after placement; it does not rearrange boxes to balance the load or guarantee an optimal packing.</p>
      <p>The presets are approximate container dimensions from the project. This is a geometric demo, with no AI model, company records or shipping approval.</p>
      <a className="inline-block text-primary underline underline-offset-4" href="https://github.com/MINBBBB1201/jsl-project/tree/c8c5489a662ae9aab354335483332116f1962072/frontend/src/lib/container-planner" target="_blank" rel="noreferrer">Read the original algorithm</a>
    </section>
  </article>;
}
