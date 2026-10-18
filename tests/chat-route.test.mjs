import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = resolve(import.meta.dirname, "..");
function handler(fetch, env = { GROQ_API_KEY: "test-only", GROQ_MODEL: "retired-model" }) {
  const cache = new Map();
  function load(path) {
    if (cache.has(path)) return cache.get(path);
    const exports = {};
    cache.set(path, exports);
    const { outputText } = ts.transpileModule(readFileSync(path, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    });
    vm.runInNewContext(outputText, {
      exports, Response, AbortSignal, fetch, process: { env },
      console: { error() {} },
      require: (name) => name.startsWith("@/")
        ? load(resolve(root, `${name.slice(2)}.ts`)) : require(name),
    });
    return exports;
  }
  return load(resolve(root, "app/api/chat/route.ts")).POST;
}
const request = (body) => new Request("http://localhost/api/chat", {
  method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" },
});

test("an unavailable configured model falls back using server-owned portfolio facts", async () => {
  const calls = [];
  const post = handler(async (_url, init) => {
    const payload = JSON.parse(init.body);
    calls.push(payload);
    return calls.length === 1
      ? Response.json({ error: { code: "model_not_found" } }, { status: 404 })
      : Response.json({ choices: [{ message: { content: "Deputy Head of Technology" } }] });
  });
  const res = await post(request({ message: "What is the DAEMUN role?", projectContext: { role: "invented" } }));
  assert.equal(res.status, 200);
  assert.deepEqual(calls.map((call) => call.model), ["retired-model", "openai/gpt-oss-20b"]);
  assert.match(calls[1].messages[0].content, /Deputy Head of Technology/);
  assert.match(calls[1].messages[0].content, /3\.984/);
  assert.match(calls[1].messages[0].content, /PSYCHOFISH/);
  assert.doesNotMatch(calls[1].messages[0].content, /invented/);
  assert.equal((await res.json()).choices[0].message.content, "Deputy Head of Technology");
});

test("blank, oversized and malformed questions are rejected before calling the provider", async () => {
  const post = handler(() => { throw new Error("provider must not be called"); });
  for (const body of [{ message: " " }, { message: "x".repeat(2001) }, {}]) {
    assert.equal((await post(request(body))).status, 400);
  }
  assert.equal((await post(new Request("http://localhost/api/chat", { method: "POST", body: "{" }))).status, 400);
});

test("missing credentials return a controlled service-unavailable response", async () => {
  const post = handler(() => { throw new Error("unexpected request"); }, {});
  assert.equal((await post(request({ message: "Hello" }))).status, 503);
});

test("rate limits are preserved without a retry or provider detail disclosure", async () => {
  let calls = 0;
  const post = handler(async () => {
    calls++;
    return Response.json({ error: { message: "private provider diagnostic" } }, { status: 429 });
  });
  const res = await post(request({ message: "Hello" }));
  assert.equal(res.status, 429);
  assert.equal(calls, 1);
  assert.doesNotMatch(await res.text(), /private provider diagnostic/);
});

test("the default model is tried only once and empty completions are not successes", async () => {
  let calls = 0;
  const post = handler(async () => {
    calls++;
    return Response.json({ choices: [{ message: { content: "" } }] });
  }, { GROQ_API_KEY: "test-only" });
  assert.equal((await post(request({ message: "Hello" }))).status, 502);
  assert.equal(calls, 1);
});

test("provider network failures return a controlled error", async () => {
  const post = handler(async () => { throw new Error("network failure"); });
  assert.equal((await post(request({ message: "Hello" }))).status, 502);
});
