// deno-lint-ignore-file prefer-const
import { Controller } from "./engine/Controller.ts"

console.log(`Current global.ENV:\n${JSON.stringify(globalThis.ENV, null, 4)}`);

let urlParams = new URLSearchParams(window.location.search);
let packName = urlParams.get("pack") ?? "Escape From Darkness";
console.log(packName)
var controller = Controller.instance;
controller.setPack(packName).then(() => {
    let scene = urlParams.get("scene");
    console.log(scene);
    if (scene) {
        $("body > section").addClass("hidden");
        $("#game").removeClass("hidden");
        $(".game_ux_element").removeClass("hidden");
        
        controller.changeScene(scene);
    }
})

if (!urlParams.get("dev")) {
    alert("Внимание, движок находится на ранней стадии разработки, поэтому будьте готовы к шоколадкам")
}