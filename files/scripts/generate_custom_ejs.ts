import { walkSync } from "https://deno.land/std/fs/mod.ts";
import { join } from "https://deno.land/std/path/mod.ts";
import { parseAll } from "https://deno.land/std/yaml/mod.ts";

const postsDir = './conteudo';


async function getFilesRecursively(dir: string): Promise<string[]> {
    const results: string[] = [];
    for await (const entry of walkSync(dir, { exts: [".qmd", ".md"], includeDirs: false })) {
        results.push(entry.path);
    }
    return results;
}

interface Metadata {
    title?: string;
    author?: string;
    date?: string;
    categorias?: Record<string, string[]>;
}

function extractYamlFrontmatter(filePath: string): string {
    const content = Deno.readTextFileSync(filePath);    
    
    const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
    const match = content.match(frontmatterRegex);
    
    if (match && match[1]) {
      return match[1];
    }
    
    return "";
}
async function generateEJS() {
    const files = await getFilesRecursively(postsDir);
    const items: Array<{
        title: string;
        author: string;
        date: string;
        path: string;
        categorias: Record<string, string[]> | null;
    }> = [];
    const categorias: Record<string, Set<string>> = {};

    for (const filePath of files) {

        var path = "./"+filePath.replace(/\\/g, '/');

        const yamlContent = extractYamlFrontmatter(path);
        const metadata = parseAll(yamlContent.toLocaleLowerCase())[0];
        
        if (metadata.categorias && Object.keys(metadata.categorias).length > 0) {
            for (const key of Object.keys(metadata.categorias)) {
                if (!categorias[key]) {
                    categorias[key] = new Set();
                }
                //console.log(key);
                //console.log(metadata.categorias[key]);
                //console.log(metadata.title);
                if(metadata.categorias[key]){
                    for (const value of metadata.categorias[key]) {
                        categorias[key].add(value);
                    }
                }
            }
        }

        items.push({
            title: metadata.title || 'Sem titulo',
            author: metadata.author || 'Autor desconhecido',
            date: metadata.date || '',
            path: path,
            categorias: metadata.categorias || null,
        });
    }
    //ordena os valores de cada categoria
    for (const key of Object.keys(categorias)) {
        categorias[key] = new Set(Array.from(categorias[key]).sort((a, b) => a.localeCompare(b)));
    }
    let categoriasHTML = '<div class="categorias scroll-categorias">';
    //navega pelas categorias pela chave ordenada
    for (const key of Object.keys(categorias).sort()) {
        //console.log(key);
        categoriasHTML += `<button class="categoria" data-values="${Array.from(categorias[key]).join(',')}">${key.charAt(0).toUpperCase() + key.slice(1)}</button>`;
    }
    categoriasHTML += '</div>';

    const valuesContainerHTML = '<div class="values-container scroll-categorias"></div> <br>';
    let resultsContainerHTML = '<div class="results-container list grid" style="column-gap: 10px;">';

    for (const item of items) {
        if (item.categorias) {
            resultsContainerHTML += `
                <a class="page g-col-12 g-col-sm-6 g-col-md-4 mb-2" href = "${item.path}" style="text-decoration: none;" data-categories='${JSON.stringify(item.categorias)}'> 
                    <div class="card border-2 rounded-3">
                        <div class= "card-title">${item.title}</div>
                        <div class="card-text inline-block">
                            <p>${item.date}</p>
                        </div>
                    </div>
                </a>`;
        } else {
            resultsContainerHTML += `
                <a class="page g-col-12 g-col-sm-6 g-col-md-4 mb-2" href = "${item.path}" style="text-decoration: none;"> 
                    <div class="card border-2 rounded-3">
                        <div class= "card-title">${item.title}</div>
                        <div class="card-text inline-block">
                            <p>${item.date}</p>
                        </div>
                    </div>
                </a>`;
        }
    }

    resultsContainerHTML += '</div>';

    const finalHTML = `
        ${categoriasHTML}
        ${valuesContainerHTML}
        ${resultsContainerHTML}
    `;

    const ejsContent = `\`\`\`{=html}
${finalHTML}
\`\`\``;

    await Deno.writeTextFileSync('custom.ejs', ejsContent);
}

generateEJS();
