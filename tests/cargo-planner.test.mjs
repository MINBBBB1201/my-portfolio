import assert from "node:assert/strict";
import { resolve } from "node:path";
import test from "node:test";
import { loadTypeScript } from "../scripts/load-typescript.mjs";

const root = resolve(import.meta.dirname, "..");
const load = (file) => loadTypeScript(resolve(root, file), root);
const { planLoad } = load("lib/demos/container-planner/plan-load.ts");
const { CONTAINER_SPECS } = load("lib/demos/container-planner/containers.ts");
const { cargoScenarios, validateDemoCargo } = load("lib/demos/cargo-samples.ts");

test("all synthetic scenarios stay within bounds, payload and collision limits", () => {
  for (const container of Object.values(CONTAINER_SPECS)) {
    for (const scenario of cargoScenarios) {
      const plan = planLoad(container, scenario.boxes);
      assert.ok(plan.totalWeightKg <= container.maxPayloadKg);
      assert.equal(plan.placed.length + plan.unplaced.reduce((n,b) => n + b.quantity, 0), scenario.boxes.reduce((n,b) => n + b.quantity, 0));
      const bounds = [container.innerLengthCm, container.innerWidthCm, container.innerHeightCm];
      for (const box of plan.placed) {
        box.positionCm.forEach((v, axis) => {
          assert.ok(v >= 0);
          assert.ok(v + box.sizeCm[axis] <= bounds[axis] + 0.01);
        });
        for (const other of plan.placed) {
          if (box === other) continue;
          const intersects = box.positionCm.every((v, axis) => v < other.positionCm[axis] + other.sizeCm[axis] - 0.001 && other.positionCm[axis] < v + box.sizeCm[axis] - 0.001);
          assert.equal(intersects, false);
        }
      }
    }
  }
});

test("payload and oversized examples give different, real rejection reasons", () => {
  const c = CONTAINER_SPECS["20FT_DRY"];
  const heavy = planLoad(c, cargoScenarios[1].boxes);
  assert.equal(heavy.overweight, true);
  assert.ok(heavy.unplaced.some((b) => b.reason === "WEIGHT_LIMIT"));
  assert.ok(planLoad(c, cargoScenarios[2].boxes).unplaced.some((b) => b.reason === "OVERSIZED"));
});

test("rotation and non-stackable options change feasible placements", () => {
  const c = { id: "20FT_DRY", label: "Test", innerLengthCm: 120, innerWidthCm: 100, innerHeightCm: 100, maxPayloadKg: 1000 };
  const box = { id: "a", name: "Test", lengthCm: 100, widthCm: 120, heightCm: 100, weightKg: 10, quantity: 1 };
  assert.equal(planLoad(c, [{ ...box, rotatable: false }]).placed.length, 0);
  assert.equal(planLoad(c, [{ ...box, rotatable: true }]).placed.length, 1);
  const tall = { ...c, innerLengthCm: 100, innerHeightCm: 200 };
  const cube = { ...box, lengthCm: 100, widthCm: 100, quantity: 2 };
  assert.equal(planLoad(tall, [{ ...cube, stackable: true }]).placed.length, 2);
  assert.equal(planLoad(tall, [{ ...cube, stackable: false }]).placed.length, 1);
});

test("demo rejects unbounded, fractional and invalid inputs before packing", () => {
  const sample = cargoScenarios[0].boxes[0];
  assert.equal(validateDemoCargo([sample]), null);
  for (const change of [{ quantity: 61 }, { quantity: 1.5 }, { lengthCm: NaN }, { weightKg: Infinity }, { widthCm: 0 }]) assert.ok(validateDemoCargo([{ ...sample, ...change }]));
  assert.ok(validateDemoCargo([{ ...sample, quantity: 40 }, { ...sample, id: "b", quantity: 40 }]));
});
