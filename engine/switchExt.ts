import * as path from "https://deno.land/std@0.224.0/path/mod.ts";
import { parse } from "https://cdn.skypack.dev/jsonc-parser";

const rawArg = Deno.args[0];
if (rawArg !== "ts" && rawArg !== "js") {
    console.log("Invalid argument. Use 'ts' or 'js'");
    Deno.exit();
}
const arg = rawArg as "ts" | "js";

const d = {
    "ts": "js",
    "js": "ts"
}

console.log("Switching imports to ", arg);

const distDir = path.join(Deno.cwd(), 'js');

processDir(distDir)

async function processDir(dir: string) {
    const files = Deno.readDirSync(dir);
    for (const file of files) {
        console.log(file.name);

        const filePath = path.join(dir, file.name);
        if (file.isDirectory) {
            processDir(filePath);
        }
        if (file.isFile && filePath.endsWith('.js')) {
            let content = await Deno.readTextFile(filePath);

            // console.log(new RegExp(`(import .* from ['"].*)\.${d[arg]}(['"])`, "g"))
            content = content.replaceAll(new RegExp(`(import .* from ['"].*)\.${d[arg]}(['"])`, "g"), `$1.${arg}$2`);
            content = content.replaceAll(new RegExp(`(import ['"].*)\.${d[arg]}(['"])`, "g"), `$1.${arg}$2`);
            content = content.replaceAll(new RegExp(`(import\(\p*['"].*).${d[arg]}(['"]\p*\))`, "g"), `$1.${arg}$2`);

            await Deno.writeTextFile(filePath, content);
        }
    }
}

