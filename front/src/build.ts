import * as esbuild from "esbuild";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader";

const result = await esbuild.build({
    plugins: [...denoPlugins()],
    entryPoints: ["./src/main.ts"],
    outdir: "./js/",
    bundle: false,
    platform: "browser",
    format: "esm",
    target: "esnext",
    minify: false,
    sourcemap: true,
    treeShaking: true
});
  
esbuild.stop();