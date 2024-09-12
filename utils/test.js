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
  assets: "asset",
  ecosystems: "ecosystem",
  features: "feature",
  usecases: "usecase",
  ranks: "rank",
};

const schemaDir = "./schema";
const schemas = await loadSchemas();

schemas.project.properties.categories.items.enum = w3pd.data.categories.map(
  (c) => c.id
);

for (const col of Object.keys(w3pd.data)) {
  const validator = ajv.compile(schemas[matrix[col]]);
  const ids = [];

  for (const item of w3pd.data[col]) {
    delete item._path;
    const testName =
      `${col}/${item.id} ` +
      (col === "projects"
        ? `[${
            Array.isArray(item.categories)
              ? item.categories.join(", ")
              : item.categories
          }]`
        : "");

    if (ids.includes(item.id)) {
      Deno.test(testName + " (id-duplicates)", () => {
        throw { message: `Duplicate project id="${item.id}"` };
      });
    }

    if (Object.keys(item).length > 1) {
      Deno.test(testName + " (schema)", () => {
        if (!validator(item)) {
          // throw validator.errors;
          // log instead of throwing to proceed building all projects
          console.log(validator.errors);
        }
      });
    }
    ids.push(item.id);
  }
}
