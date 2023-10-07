import yaml from "npm:js-yaml";

export class W3PData {
  constructor() {
  }

  async init() {
    this.data = await this.load("./src");
  }

  async load(dataDir) {
    const out = {};
    for await (const f of Deno.readDir(dataDir)) {
      if (f.isFile && f.name.match(/\.yaml$/)) {
        const name = f.name.split(".")[0];
        out[name] = await this.loadYaml(`${dataDir}/${f.name}`);
      }
      if (f.isDirectory && f.name === "projects") {
        out.projects = [];
        const projectsDir = `${dataDir}/${f.name}`;
        for await (const pcd of Deno.readDir(projectsDir)) {
          const catName = pcd.name;
          const catDir = `${projectsDir}/${pcd.name}`;
          for await (const pd of Deno.readDir(catDir)) {
            if (!pd.isDirectory) {
              continue;
            }
            const pDir = `${catDir}/${pd.name}`;
            const index = yaml.load(
              await Deno.readTextFile(`${pDir}/index.yaml`),
            );
            out.projects.push(Object.assign({ id: pd.name }, index));
          }
        }
      }
    }
    return out;
  }

  async loadYaml(f) {
    return yaml.load(await Deno.readTextFile(f));
  }
}
