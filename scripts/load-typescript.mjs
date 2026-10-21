import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import vm from "node:vm";
import ts from "typescript";

// Evaluate local, pure TypeScript data/math modules only. No package or IO imports.
export function loadTypeScript(file, root, cache = new Map()) {
  const path = resolve(file);
  if (!path.startsWith(resolve(root) + "/") && !path.startsWith(resolve(root) + "\\")) throw new Error("Module outside repository");
  if (cache.has(path)) return cache.get(path);
  const exports = {};
  cache.set(path, exports);
  const { outputText } = ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const require = (name) => {
    if (!name.startsWith("@/") && !name.startsWith(".")) throw new Error(`Unexpected runtime import: ${name}`);
    const target = name.startsWith("@/") ? resolve(root, name.slice(2)) : resolve(dirname(path), name);
    return loadTypeScript(`${target}.ts`, root, cache);
  };
  vm.runInNewContext(outputText, { exports, require }, { timeout: 5000 });
  return exports;
}
