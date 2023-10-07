import { W3PData } from "./w3pdata.js";

const w3pd = new W3PData();
await w3pd.init();

const outputDir = "./dist";

try {
  await Deno.mkdir(outputDir);
} catch {}

const bundleFn = `${outputDir}/bundle.json`;
await Deno.writeTextFile(bundleFn, JSON.stringify(w3pd.data, null, 2));
console.log(`Bundle writed: ${bundleFn}`);
