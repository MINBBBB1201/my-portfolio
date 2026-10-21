import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import vm from "node:vm";
import test from "node:test";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import ts from "typescript";
import { loadTypeScript } from "../scripts/load-typescript.mjs";

const root = resolve(import.meta.dirname, "..");
const nativeRequire = createRequire(import.meta.url);
const exports = {};
const { outputText } = ts.transpileModule(readFileSync(resolve(root, "components/demos/cargo-planner.tsx"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX },
});
const require = (name) => {
  if (name === "@/components/ui/button") return { Button: ({ children, variant: _variant, ...props }) => createElement("button", props, children) };
  if (name.startsWith("@/lib/")) return loadTypeScript(resolve(root, `${name.slice(2)}.ts`), root);
  return nativeRequire(name);
};
vm.runInNewContext(outputText, { exports, require });

test("server-rendered SVG titles retain box descriptions without hydration markers", () => {
  const html = renderToString(createElement(exports.default));
  const titles = Array.from(html.matchAll(/<title>(.*?)<\/title>/g), (match) => match[1]);
  assert.equal(titles.length, 37);
  assert.ok(titles.slice(1).every((text) => /cartons|crates/.test(text) && /cm.*kg/.test(text)));
  assert.ok(titles.every((text) => !text.includes("<!--")));
});
