import { readFileSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import vm from "node:vm";
import ts from "typescript";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
function config(name) {
  const source = readFileSync(join(root, "config", `${name}.ts`), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  // These data-only files have no runtime imports. Fail if that changes.
  const exports = {};
  vm.runInNewContext(outputText, { exports }, { timeout: 1000 });
  return exports;
}

const data = {
  ...config("site"),
  ...config("honors"),
  ...config("experience"),
  ...config("community"),
  ...config("projects"),
  email: readFileSync(join(root, "config/socials.ts"), "utf8").match(/mailto:([^"\s]+)/)?.[1],
};
if (!data.email) throw new Error("No published contact email found");
const temporary = mkdtempSync(join(tmpdir(), "portfolio-resume-"));
try {
  const input = join(temporary, "data.json");
  writeFileSync(input, JSON.stringify(data));
  const result = spawnSync(process.env.PDF_PYTHON || "python", [
    join(root, "scripts/render-resume.py"), input, join(root, "public/resume.pdf"),
  ], { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exitCode = result.status || 1;
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
