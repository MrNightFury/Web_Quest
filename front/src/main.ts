// import { Controller } from "./engine/Controller.ts"

import { setupEnv, Runtime } from "./Environment.js";
setupEnv();
// console.log(`Current global.ENV:\n${JSON.stringify(globalThis.ENV, null, 4)}`);

if (ENV.runtime == Runtime.DENO) {
    const Webview = await import("@webview/webview")
    const webview = new Webview.Webview();

    webview.navigate("http://vk.com");
    webview.run();
    console.log(ENV)
} else {
    console.log("This is a browser environment");
    console.log(ENV)
}

// let urlParams = new URLSearchParams(window.location.search);
// let packName = urlParams.get("pack") ?? "Escape From Darkness";
// console.log(packName)
// var controller = Controller.instance;
// controller.setPack(packName).then(() => {
//     let scene = urlParams.get("scene");
//     console.log(scene);
//     if (scene) {
//         $("body > section").addClass("hidden");
//         $("#game").removeClass("hidden");
//         $(".game_ux_element").removeClass("hidden");
        
//         controller.changeScene(scene);
//     }
// })

// if (!urlParams.get("dev")) {
//     alert("Внимание, движок находится на ранней стадии разработки, поэтому будьте готовы к шоколадкам")
// }