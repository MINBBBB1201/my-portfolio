import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
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
  assert.deepEqual(Array.from(featuredProjects, (p) => p.id), ["daemun-iii", "cosmos-tvc-hopper", "jsl-logistics"]);
  assert.ok(featuredProjects.some((p) => p.status === "Completed"));
  assert.ok(featuredProjects.some((p) => p.status === "In progress"));
  for (const project of featuredProjects) assert.ok(project.role);
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
  assert.equal(mintech.startMonth, "2026-07");
  assert.equal(mintech.period, "July 20 to August 19, 2026 (one month)");
  const camp = experiences.find((e) => e.id === "kau-aerospace-camp");
  assert.equal(camp.period, "August 3 to 7, 2026");
  assert.equal(experiences.find((e) => e.id === "jsl-logistics").period, "August 2026 to present");
  assert.equal(mintech.achievements.length, 0);
  assert.equal(experiences.find((e) => e.id === "jsl-logistics").endDate, "Present");
});

test("date display supports confirmed status without inventing a date", () => {
  const { getDurationText } = data("lib/experience-dates.ts");
  assert.equal(getDurationText(undefined, "Completed"), "Completed");
  assert.equal(getDurationText(undefined, "Present"), "In progress");
  assert.match(getDurationText(new Date("2026-08-01"), "Completed"), /Aug 2026.*Completed/);
});

test("autopilot class research stays within what is verified", () => {
  const { Projects } = data("config/projects.ts");
  const study = Projects.find((p) => p.id === "autopilot-mechanism-study");
  assert.ok(study);
  assert.equal(study.status, "Completed");
  assert.equal(study.startDate, undefined);
  assert.equal(study.endDate, undefined);
  assert.equal(study.paperLink, "/projects/autopilot-mechanism-study/research-paper.pdf");
  assert.ok(existsSync(resolve(import.meta.dirname, "..", "public", study.paperLink.slice(1))));
  assert.match(study.paperNote, /portfolio version/);
  const text = JSON.stringify(study);
  assert.doesNotMatch(text, /US8457811/);
  assert.match(text, /illustrative/);
  assert.match(text, /no flight or hardware testing/);
});

test("ERAU ESG case study is framed as a secondary-source summary", () => {
  const { Projects } = data("config/projects.ts");
  const study = Projects.find((p) => p.id === "erau-esg-case-study");
  assert.ok(study);
  assert.equal(study.status, "Completed");
  assert.equal(study.startDate, undefined);
  assert.equal(study.paperLink, undefined);
  const text = JSON.stringify(study);
  assert.match(text, /no original data/i);
  assert.doesNotMatch(text, /99%|@qdis|eliminat/);
});

test("honors follow the school award record", () => {
  const { honors } = data("config/honors.ts");
  const text = JSON.stringify(honors);
  assert.doesNotMatch(text, /Physics Division/);
  const paper = honors.find((h) => h.title.startsWith("1st Place, Excellent Research Paper"));
  assert.ok(paper);
  assert.equal(paper.date, "December 2025");
  const writing = honors.find((h) => h.title.includes("Korean Literature Writing Contest"));
  assert.ok(writing);
  assert.equal(writing.date, "May 2025");
  assert.doesNotMatch(JSON.stringify(writing), /Top Excellence/);
  assert.equal(honors.find((h) => h.title.includes("Science Fair")).date, "April 2026");
  assert.equal(honors.filter((h) => h.title.startsWith("Academic Improvement Award")).length, 6);
  for (const honor of honors) assert.ok(honor.group, honor.title);
  assert.doesNotMatch(text, /45 (school-certified )?hours/);
});

test("COSMOS titles use co-founder wording and the physics division is gone everywhere", () => {
  const roots = ["config", "app", "components", "content", "lib"];
  const files = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const full = resolve(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (/\.(ts|tsx|md|mdx)$/.test(name)) files.push(full);
    }
  };
  for (const root of roots) walk(resolve(import.meta.dirname, "..", root));
  files.push(resolve(import.meta.dirname, "..", "README.md"));
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    assert.doesNotMatch(text, /(?<!o-)[Ff]ounder (&|and) [Pp]resident|(?<!o-)[Ff]ounded COSMOS|club I founded|[Ff]ounder and lead of \*\*COSMOS/, file);
    assert.doesNotMatch(text, /Physics Division/, file);
  }
  const { experiences } = data("config/experience.ts");
  assert.equal(experiences.find((e) => e.id === "cosmos").position, "Co-founder & President");
});

test("résumé and CV are static PDFs and the old generator is gone", () => {
  const root = resolve(import.meta.dirname, "..");
  const pdfs = [["public/resume.pdf", 1], ["public/cv-full.pdf", 2]];
  for (const [file, pages] of pdfs) {
    const bytes = readFileSync(resolve(root, file));
    assert.equal(bytes.subarray(0, 5).toString("latin1"), "%PDF-");
    const count = (bytes.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
    assert.equal(count, pages, file);
  }
  const scripts = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8")).scripts;
  assert.equal(scripts.resume, undefined);
  assert.equal(existsSync(resolve(root, "scripts/generate-resume.mjs")), false);
});

test("Orchestrators entry stays within what the public repositories show", () => {
  const { experiences } = data("config/experience.ts");
  assert.equal(experiences.find((e) => e.id === "mechanics-club"), undefined);
  const team = experiences.find((e) => e.id === "orchestrators");
  assert.ok(team);
  assert.equal(team.position, "Vice President");
  assert.match(team.company, /Orchestrators \(formerly Mechanics Club\)/);
  const text = JSON.stringify(team);
  assert.match(text, /not yet assembled/);
  assert.match(text, /PCB design verification/);
  assert.match(text, /generated by a script/);
  assert.match(text, /under team review/);
  assert.doesNotMatch(text, /designed the PCB|built (the )?Agent Device|agentic framework/i);
  const { contributionsUnsorted } = data("config/contributions.ts");
  assert.equal(contributionsUnsorted.find((c) => c.repo === "housing-base"), undefined);
  for (const repo of ["ae", "daesik"]) assert.ok(contributionsUnsorted.find((c) => c.repo === repo && c.repoOwner === "FiveOchestrators"), repo);
});

test("service hours are not published and honors carry the confirmed qualifiers", () => {
  const { communityInvolvement } = data("config/community.ts");
  assert.doesNotMatch(JSON.stringify(communityInvolvement), /school-certified|certified hours/i);
  const { honors } = data("config/honors.ts");
  assert.ok(honors.find((h) => h.title === "1st Place, Science Fair (High School Division)"));
  assert.ok(honors.find((h) => h.title.startsWith("2nd Place, school-wide Korean Literature Writing Contest")));
});
