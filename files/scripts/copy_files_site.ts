import { copy } from "https://deno.land/std/fs/copy.ts";
import {ensureDir} from "https://deno.land/std/fs/ensure_dir.ts";

await copy('./files/images/', './_site/files/images', { overwrite: true });
await copy('./files/scripts/', './_site/files/scripts', { overwrite: true });
await copy('./files/static/', './_site/files/static', { overwrite: true });
await copy('./pwa/sw.js', './_site/sw.js', { overwrite: true });
await ensureDir('./_site/pwa/');
await copy('./pwa/loadserviceworker.js', './_site/pwa/loadserviceworker.js', { overwrite: true });

console.log("Files copied successfully!");