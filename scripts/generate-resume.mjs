import { readFileSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { loadTypeScript } from "./load-typescript.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const data = {
  ...loadTypeScript(join(root, "lib/resume-data.ts"), root).getResumeData(),
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
