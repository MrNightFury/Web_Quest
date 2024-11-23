import { setupEnv } from "./Environment.js";
import { Engine } from "./engine/Engine.js";
console.log("Setting up environment...");
setupEnv();
console.log("Starting engine...");
const engine = new Engine();
console.log("Loading pack...");
console.log(await engine.loadPack("ChoosePack"));
if (ENV.deno) {
    // @ts-ignore:
    // const Webview = (await import("@webview/webview")).Webview;
    // const webview = new Webview(ENV.debug);
    // webview.navigate("http://google.com");
    // webview.run();
}
else {
    console.log("Browser");
}
