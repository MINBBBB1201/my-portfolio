import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

function data(file) {
  const exports = {};
  const { outputText } = ts.transpileModule(readFileSync(resolve(import.meta.dirname, "..", file), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  vm.runInNewContext(outputText, { exports });
  return exports;
}

test("selected AI projects have explicit state and team roles without guessed dates", () => {
  const { Projects, featuredProjects } = data("config/projects.ts");
  assert.deepEqual(Array.from(featuredProjects, (p) => p.id), ["cosmos-tvc-hopper", "ciws-drone-tracking-turret", "jsl-logistics"]);
  assert.deepEqual(Array.from(Projects.slice(0, 3), (p) => p.id), Array.from(featuredProjects, (p) => p.id));
  for (const project of Projects) assert.ok(["In progress", "Completed"].includes(project.status));
  assert.equal(Projects.find((p) => p.id === "cosmos-tvc-hopper").endDate, undefined);
  assert.equal(Projects.find((p) => p.id === "jsl-logistics").startDate, undefined);
  assert.equal(Projects.find((p) => p.id === "daemun-iii").status, "Completed");
  assert.equal(new Set(Projects.map((p) => p.id)).size, Projects.length);
});

test("completed experience is not represented as current, and unknown dates stay absent", () => {
  const { experiences } = data("config/experience.ts");
  assert.equal(experiences.find((e) => e.id === "daemun-iii").endDate, "Completed");
  const mintech = experiences.find((e) => e.id === "mintech");
  assert.equal(mintech.endDate, "Completed");
  assert.equal(mintech.startDate, undefined);
  assert.equal(mintech.achievements.length, 0);
  assert.equal(experiences.find((e) => e.id === "jsl-logistics").endDate, "Present");
});

test("date display supports confirmed status without inventing a date", () => {
  const { getDurationText } = data("lib/experience-dates.ts");
  assert.equal(getDurationText(undefined, "Completed"), "Completed");
  assert.equal(getDurationText(undefined, "Present"), "In progress");
  assert.match(getDurationText(new Date("2026-08-01"), "Completed"), /Aug 2026.*Completed/);
});
