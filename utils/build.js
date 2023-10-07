import { emptyDir } from "https://deno.land/std@0.203.0/fs/empty_dir.ts";
import { W3PData } from "./w3pdata.js";

const w3pd = new W3PData();
await w3pd.init();

const outputDir = "./dist";

try {
  await emptyDir(outputDir);
} catch {}

const bundleFn = `${outputDir}/index.json`;
await Deno.writeTextFile(bundleFn, JSON.stringify(w3pd.data, null, 2));
console.log(`Bundle writed: ${bundleFn}`);
