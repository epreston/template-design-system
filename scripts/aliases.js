// based on vue/core mono repo build system

// these aliases are shared between vitest and rollup
import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const resolveEntryForPkg = (p) =>
  path.resolve(fileURLToPath(import.meta.url), `../../packages/${p}/src/index.js`);

const dirs = readdirSync(new URL('../packages', import.meta.url));

const entries = {
  'vue-components': resolveEntryForPkg('vue-components')
};

const nonSrcPackages = ['eslint-config', 'prettier-config', 'tsconfig'];

for (const dir of dirs) {
  const key = `@vue-components/${dir}`;
  if (
    dir !== 'vue-components' &&
    !nonSrcPackages.includes(dir) &&
    !(key in entries) &&
    statSync(new URL(`../packages/${dir}`, import.meta.url)).isDirectory()
  ) {
    entries[key] = resolveEntryForPkg(dir);
  }
}

export { entries };
