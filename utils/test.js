import Ajv from "https://esm.sh/ajv@8.8.1?pin=v58";
import addFormats from "https://esm.sh/ajv-formats@2.1.1";
import yaml from "npm:js-yaml";

import { W3PData } from "./w3pdata.js";

const w3pd = new W3PData();
await w3pd.init();

const ajv = new Ajv({ strict: false });
addFormats(ajv);

async function loadSchemas() {
  const out = {};
  for await (const f of Deno.readDir(schemaDir)) {
    const col = f.name.split(".")[0];
    out[col] = yaml.load(await Deno.readTextFile(`${schemaDir}/${f.name}`));
  }
  return out;
}

const matrix = {
  categories: "category",
  projects: "project",
};

const schemaDir = "./schema";
const schemas = await loadSchemas();

for (const col of Object.keys(w3pd.data)) {
  const validator = ajv.compile(schemas[matrix[col]]);

  for (const item of w3pd.data[col]) {
    Deno.test(`${col}/${item.id}`, () => {
      if (!validator(item)) {
        throw validator.errors;
      }
    });
  }
}
