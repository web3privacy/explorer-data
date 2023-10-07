import yaml from 'npm:js-yaml'

function slugify(input) {
    if (!input)
        return '';

    // make lower case and trim
    var slug = input.toLowerCase().trim();

    // remove accents from charaters
    slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    // replace invalid chars with spaces
    slug = slug.replace(/[^a-z0-9\s-]/g, ' ').trim();

    // replace multiple spaces or hyphens with a single hyphen
    slug = slug.replace(/[\s-]+/g, '-');

    return slug;
}

const projectDir = "src/projects"

async function genCat (cat) {
    const catDir = `${projectDir}/${cat}`
    const f = await Deno.readTextFile(`${catDir}/src.json`)
    const src = JSON.parse(f)

    for (const p of src.data.Projects) {
        const id = slugify(p.Project)
        const pDir = `${catDir}/${id}`
        console.log(`${id}:\n  -> ${pDir}`)

        try {
            await Deno.mkdir(pDir)
        } catch {}

        const out = {
            name: p.Project,
            description: p.Description,
            ecosystem: p.Ecosystem,
            links: {
                github: p.GitHub,
                linkedin: p.TeamLink,
            },
            team: {
                anonymous: p.Team !== "Public"
            }
        }
        const yml = yaml.dump(out)
        await Deno.writeTextFile(`${pDir}/index.yaml`, yml)
        //console.log(id, yml)
    }
}

genCat(Deno.args[0])
