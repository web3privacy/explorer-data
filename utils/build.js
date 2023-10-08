import { emptyDir } from "https://deno.land/std@0.203.0/fs/empty_dir.ts";
import { ensureDir } from "https://deno.land/std@0.203.0/fs/ensure_dir.ts";

import { W3PData } from "./w3pdata.js";

const w3pd = new W3PData();
await w3pd.init();

const outputDir = "./dist";

try {
  await emptyDir(outputDir);
} catch {}

for (const p of w3pd.data.projects) {
  if (!p.logos) {
    continue
  }
  for (const asset of p.logos) {
    const src = `${p._path}/${asset.file}`
    const destDir = `${outputDir}/assets/projects/${p.id}`
    const dest = `${destDir}/${asset.file}`

    await ensureDir(destDir)
    await Deno.copyFile(src, dest);

    console.log(`${src} -> ${dest}`)
  }
}

const bundleFn = `${outputDir}/index.json`;

const out = {}
for (const key of Object.keys(w3pd.data)) {

  const arr = []
  if (key === 'projects') {
    for (const p of w3pd.data[key]) {
      delete p._path
      arr.push(p)
    }
  }

  out[key] = arr
}

await Deno.writeTextFile(bundleFn, JSON.stringify(w3pd.data, null, 2));
console.log(`Bundle writed: ${bundleFn}`);
