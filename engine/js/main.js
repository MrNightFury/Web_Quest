import { setupEnv } from "./Environment.js";
import { Engine } from "engine/Engine";
console.log("Setting up environment...");
setupEnv();
console.log("Starting engine...");
const engine = new Engine();
console.log("Loading pack...");
if (ENV.deno) {
    console.log("Running in Deno...");
    const Window = (await import("./Window.js")).Window;
    ENV.webview = new Window(ENV.debug);
    ENV.webview.openLocal("index.html");
    // ENV.webview.navigate("http://google.com");
    // webview.run();
}
else {
    console.log("Running in browser...");
}
await engine.loadPack("ChosePack");
if (ENV.deno) {
    console.log("Running webview...");
    ENV.webview?.run();
}
