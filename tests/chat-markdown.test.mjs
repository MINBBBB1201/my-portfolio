import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import vm from "node:vm";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const require = createRequire(import.meta.url);
const exports = {};
const { outputText } = ts.transpileModule(readFileSync(resolve(import.meta.dirname, "../components/chat-message.tsx"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
});
vm.runInNewContext(outputText, { exports, require });
const render = (content) => renderToStaticMarkup(createElement(exports.default, { content }));

test("chat replies render readable tables and clickable portfolio links", () => {
  const html = render("| Project | Link |\n| --- | --- |\n| DAEMUN | [Details](/projects/daemun-iii) |\n\nhttps://github.com/MINBBBB1201");
  assert.match(html, /<table/);
  assert.match(html, /href="\/projects\/daemun-iii"/);
  assert.match(html, /href="https:\/\/github.com\/MINBBBB1201"/);
  assert.doesNotMatch(html, /\| --- \|/);
});

test("model replies cannot inject HTML, image requests, or executable links", () => {
  const html = render('<script>alert(1)</script>\n\n<img src="https://example.com/tracker">\n\n![tracker](https://example.com/image)\n\n[bad](javascript:alert%281%29)');
  assert.doesNotMatch(html, /<script|<img|href="javascript:/i);
});
