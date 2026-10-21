"use client";

import { useState, type FormEvent } from "react";
import { CONTAINER_SPECS } from "@/lib/demos/container-planner/containers";
import { planLoad } from "@/lib/demos/container-planner/plan-load";
import type { CargoBoxInput, LoadPlan } from "@/lib/demos/container-planner/types";
import { cargoScenarios, validateDemoCargo } from "@/lib/demos/cargo-samples";
import { Button } from "@/components/ui/button";

const containers = Object.values(CONTAINER_SPECS).map((c) => ({ ...c, label: c.id === "20FT_DRY" ? "20 ft dry" : c.id === "40FT_DRY" ? "40 ft dry" : "40 ft high cube" }));
const palette = ["#4a9eab", "#dc9b50", "#9183ce"];
const reasonText = { WEIGHT_LIMIT: "Payload limit", OVERSIZED: "Too large for this container", NO_SPACE: "No supported space found by the heuristic" };
const initial = cargoScenarios[0].boxes;

function LoadingView({ plan }: { plan: LoadPlan }) {
  const c = plan.container;
  const scale = 700 / (c.innerLengthCm + c.innerWidthCm * 0.65);
  const point = (x: number, y: number, z: number) => [45 + (x + y * 0.65) * scale, 370 + (-y * 0.4 - z) * scale];
  const polygon = (coords: number[][]) => coords.map(([x, y, z]) => point(x, y, z).join(",")).join(" ");
  const l = c.innerLengthCm, w = c.innerWidthCm, h = c.innerHeightCm;
  return <svg viewBox="0 0 800 440" role="img" aria-label={`Isometric view of ${plan.placed.length} packed boxes`} className="w-full rounded-lg bg-slate-950">
    <title>Actual box positions from the cargo-loading calculation</title>
    <polygon points={polygon([[0,0,0],[l,0,0],[l,w,0],[0,w,0]])} fill="#18283c" stroke="#7890a7" />
    <polyline points={polygon([[0,0,h],[0,w,h],[l,w,h],[l,w,0],[0,w,0],[0,w,h]])} fill="none" stroke="#7890a7" strokeDasharray="5 5" />
    {[...plan.placed].sort((a,b) => (b.positionCm[1] - a.positionCm[1]) || (a.positionCm[2] - b.positionCm[2]) || (a.positionCm[0] - b.positionCm[0])).map((box) => {
      const [x,y,z] = box.positionCm, [dx,dy,dz] = box.sizeCm;
      const color = palette[box.boxId === "a" ? 0 : box.boxId === "b" ? 1 : 2];
      return <g key={box.instanceId} stroke="#111c2b" strokeWidth="0.7">
        <title>{`${box.box.name} · ${box.sizeCm.join(" × ")} cm · ${box.weightKg} kg`}</title>
        <polygon points={polygon([[x,y,z],[x+dx,y,z],[x+dx,y,z+dz],[x,y,z+dz]])} fill={color} />
        <polygon points={polygon([[x+dx,y,z],[x+dx,y+dy,z],[x+dx,y+dy,z+dz],[x+dx,y,z+dz]])} fill={color} style={{ filter: "brightness(0.7)" }} />
        <polygon points={polygon([[x,y,z+dz],[x+dx,y,z+dz],[x+dx,y+dy,z+dz],[x,y+dy,z+dz]])} fill={color} style={{ filter: "brightness(1.2)" }} />
      </g>;
    })}
    <text x="45" y="415" fill="#cbd5e1" fontSize="14">Isometric loading view · {c.label}</text>
    <text x="710" y="395" fill="#cbd5e1" fontSize="12">Door →</text>
  </svg>;
}

export default function CargoPlanner() {
  const [containerId, setContainerId] = useState(containers[0].id);
  const [boxes, setBoxes] = useState<CargoBoxInput[]>(initial);
  const [plan, setPlan] = useState(() => planLoad(containers[0], initial));
  const [error, setError] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [scenario, setScenario] = useState(0);
  function loadScenario(index: number) {
    const next = cargoScenarios[index].boxes;
    setScenario(index); setBoxes(next); setError(null); setDirty(false);
    setPlan(planLoad(containers.find((c) => c.id === containerId)!, next));
  }
  function update(index: number, field: keyof CargoBoxInput, value: number | boolean) {
    setBoxes((current) => current.map((box, i) => i === index ? { ...box, [field]: value } : box)); setDirty(true);
  }
  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const problem = validateDemoCargo(boxes);
    setError(problem);
    if (problem) return;
    setPlan(planLoad(containers.find((c) => c.id === containerId)!, boxes)); setDirty(false);
  }
  const unplaced = plan.unplaced.reduce((sum, item) => sum + item.quantity, 0);
  return <div className="space-y-6">
    <div className="flex flex-wrap gap-2" aria-label="Sample cargo scenarios">
      {cargoScenarios.map((item, index) => <Button key={item.name} type="button" variant={scenario === index ? "default" : "outline"} onClick={() => loadScenario(index)}>{item.name}</Button>)}
    </div>
    <p className="text-sm text-muted-foreground">{cargoScenarios[scenario].description} Edit the inputs below to try your own variation.</p>
    <div className="grid items-start gap-6 lg:grid-cols-[340px_1fr]">
      <form onSubmit={calculate} className="space-y-4 rounded-xl border bg-card p-4">
        <label className="block text-sm font-medium">Container preset
          <select value={containerId} onChange={(e) => { setContainerId(e.target.value as typeof containerId); setDirty(true); }} className="mt-2 w-full rounded-md border bg-background p-2">
            {containers.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </label>
        <p className="text-xs text-muted-foreground">cm / kg · Maximum 60 boxes in this demo.</p>
        {boxes.map((box, index) => <fieldset key={box.id} className="space-y-3 rounded-lg border p-3">
          <legend className="px-1 text-sm font-semibold">{box.name}</legend>
          <div className="grid grid-cols-3 gap-2">
            {([ ["lengthCm", "Length (cm)"], ["widthCm", "Width (cm)"], ["heightCm", "Height (cm)"], ["weightKg", "Kg / box"], ["quantity", "Quantity"] ] as const).map(([field,label]) => <label key={field} className="text-xs">{label}
              <input type="number" aria-label={`${box.name}: ${label}`} min={field === "quantity" || field === "weightKg" ? 0 : 1} max={field === "quantity" ? 60 : field === "weightKg" ? 30000 : 2000} step={field === "quantity" ? 1 : "any"} required value={Number.isNaN(box[field]) ? "" : box[field]} onChange={(e) => update(index,field,e.target.valueAsNumber)} className="mt-1 w-full min-w-0 rounded border bg-background p-2 text-sm" />
            </label>)}
          </div>
          <div className="flex flex-wrap gap-3 text-xs">
            <label className="flex items-center gap-2"><input type="checkbox" checked={box.rotatable !== false} onChange={(e) => update(index,"rotatable",e.target.checked)} />Allow rotation</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={box.stackable !== false} onChange={(e) => update(index,"stackable",e.target.checked)} />Can support boxes</label>
          </div>
        </fieldset>)}
        <Button type="submit" className="w-full">Calculate loading plan</Button>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      </form>
      <section className="min-w-0 space-y-4" aria-label="Loading plan results" aria-live="polite">
        {dirty && <p className="rounded border border-amber-500/40 bg-amber-500/10 p-3 text-sm">Inputs changed. Calculate again to update this result.</p>}
        <LoadingView plan={plan} />
        <div className="grid grid-cols-2 gap-3">
          {[["Boxes packed", `${plan.placed.length} / ${plan.placed.length + unplaced}`], ["Volume used", `${plan.volumeUtilizationPercent.toFixed(1)}%`], ["Loaded weight", `${plan.totalWeightKg.toLocaleString("en-US")} kg`], ["Payload limit", `${plan.maxPayloadKg.toLocaleString("en-US")} kg`]].map(([label,value]) => <div key={label} className="rounded-lg border p-4"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 text-xl font-semibold sm:text-2xl">{value}</p></div>)}
        </div>
        <div className="flex flex-wrap gap-3 text-sm">{boxes.map((box,index) => <span key={box.id} className="flex items-center gap-2"><span className="h-3 w-3 rounded" style={{ background: palette[index] }} />{box.name}</span>)}</div>
        {plan.unplaced.length > 0 && <div className="rounded-lg border border-amber-500/40 p-4"><h2 className="font-semibold">Cargo left out</h2><ul className="mt-2 space-y-2 text-sm">{plan.unplaced.map((item) => <li key={`${item.boxId}-${item.reason}`}>{item.quantity} × {item.box.name}: {reasonText[item.reason]}</li>)}</ul></div>}
        <p className="text-sm leading-relaxed text-muted-foreground">{plan.placed.length === 0 ? "No packed cargo to calculate a cargo center of gravity." : <>Center-of-gravity offset from the container center: length {plan.centerOfGravity.offsetPercent[0].toFixed(1)}%, width {plan.centerOfGravity.offsetPercent[1].toFixed(1)}%. {plan.centerOfGravity.withinTolerance ? "Within" : "Outside"} the project's ±10% diagnostic threshold. This threshold is not a shipping safety certification.</>}</p>
      </section>
    </div>
  </div>;
}
