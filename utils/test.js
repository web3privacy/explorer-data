import Ajv from "https://esm.sh/ajv@8.17.1?pin=v58";
import addFormats from "https://esm.sh/ajv-formats@2.1.1";
import { betterAjvErrors } from 'https://esm.sh/@apideck/better-ajv-errors@0.3.6?pin=v58';
import yaml from "npm:js-yaml";

import { W3PData } from "./w3pdata.js";

const w3pd = new W3PData();
await w3pd.init();

const ajv = new Ajv({ strict: false, allErrors: true });
addFormats(ajv);


// Custom format for date-time for validation to work
ajv.addFormat('custom-date-time', function (dateTimeString) {
  if (!dateTimeString || dateTimeString === "")
    return true

  return !isNaN(Date.parse(dateTimeString));
});

async function loadSchemas() {
  const out = {};
  for await (const f of Deno.readDir(schemaDir)) {
    const col = f.name.split(".")[0];
    out[col] = yaml.load(await Deno.readTextFile(`${schemaDir}/${f.name}`));
  }
  return out;
}

// function getDeepPropertiesKeys(obj, parentKey = '') {
//   let keys = [];

//   if (obj.hasOwnProperty('properties')) {
//     const properties = obj['properties'];

//     for (const key in properties) {
//       if (properties.hasOwnProperty(key)) {
//         const newKey = parentKey ? `${parentKey}.${key}` : key;

//         if (properties[key].hasOwnProperty('properties')) {
//           keys = keys.concat(getDeepPropertiesKeys(properties[key], newKey));
//         } else {
//           keys.push(newKey);
//         }
//       }
//     }
//   }

//   return keys;
// }

const matrix = {
  categories: "category",
  projects: "project",
  assets: "asset",
  ecosystems: "ecosystem",
  // features schema is currently used only for filtering at the explorer
  // features: "feature",
  usecases: "usecase",
  // ranks are not save in the project data
  // ranks: "rank",
  custodys: "custody",
  phases: "phase",
  requirements: "requirement"
};

const schemaDir = "./schema";
const schemas = await loadSchemas();


// schemas.rank.properties.references.items.properties.field.enum = getDeepPropertiesKeys(schemas.project);
schemas.project.properties.categories.items.enum = w3pd.data.categories.map((c) => c.id);
schemas.project.properties.usecases.items.enum = w3pd.data.usecases.map((c) => c.id);
// schemas.project.properties.technology.properties.features.items.enum = w3pd.data.features.map((f) => f.id);
schemas.project.properties.ecosystem.items.enum = w3pd.data.ecosystems.map((e) => e.id);
schemas.project.properties.assets_used.items.enum = w3pd.data.assets.map((a) => a.id);
schemas.project.properties.blockchain_features.properties.asset_custody_type.enum = ["", ...w3pd.data.custodys.map((c) => c.id)];

for (const col of Object.keys(w3pd.data)) {
  if (col === "ranks" || col === "features") continue; // Skip testing for ranks and features


  const validator = ajv.compile(schemas[matrix[col]]);
  const ids = [];

  for (const item of w3pd.data[col]) {
    delete item._path;
    const testName =
      `${col}/${item.id} ` +
      (col === "projects"
        ? `[${Array.isArray(item.categories)
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
          const betterErrors = betterAjvErrors({ errors: validator.errors });
          throw betterErrors;
          // console.log(betterErrors);
        }
      });
    }
    ids.push(item.id);
  }
}
