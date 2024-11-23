import { setupEnv, Runtime } from "./Environment.js";
setupEnv();
if (ENV.runtime == Runtime.DENO) {
  const Webview = await import("@webview/webview");
  const webview = new Webview.Webview();
  webview.navigate("http://vk.com");
  webview.run();
  console.log(ENV);
} else {
  console.log("This is a browser environment");
  console.log(ENV);
}
//# sourceMappingURL=main.js.map
