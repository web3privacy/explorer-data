import yaml from "npm:js-yaml";

const DATA_URL = 'https://data.web3privacy.info'

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
        for await (const pd of Deno.readDir(projectsDir)) {
          
          if (!pd.isDirectory) {
            continue;
          }
          const pDir = `${dataDir}/${f.name}/${pd.name}`;
          const indexFn = `${pDir}/index.yaml`;
          
          const index = Object.assign({ id: pd.name }, yaml.load(
            await Deno.readTextFile(indexFn),
          ))

          index._path = pDir
          
          // read attachments
          const logos = []
          for await (const pa of Deno.readDir(pDir)) {
            const pam = pa.name.match(/^(logo)\.(.+)$/)
            if (pam && pam[1] === 'logo') {
              logos.push({ file: pam[0], ext: pam[2], url: `${DATA_URL}/assets/projects/${index.id}/${pam[0]}` })
            }
          }
          if (logos.length > 0) {
            index.logos = logos
          }

          out.projects.push(index);
        }
      }
    }
    return out;
  }

  async loadYaml(f) {
    return yaml.load(await Deno.readTextFile(f));
  }
}
