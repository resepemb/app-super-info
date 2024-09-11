import { copy } from "https://deno.land/std/fs/copy.ts";

await copy('./files/images/', './_site/files/images', { overwrite: true });
await copy('./files/scripts/', './_site/files/scripts', { overwrite: true });
await copy('./files/static/', './_site/files/static', { overwrite: true });
await copy('./pwa/sw.js', './_site/sw.js', { overwrite: true });

console.log("Files copied successfully!");