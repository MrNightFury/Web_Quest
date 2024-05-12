import { Controller } from "./engine/Controller.js"

let urlParams = new URLSearchParams(window.location.search);
let packName = urlParams.get("pack") ?? "Escape From Darkness";
console.log(packName)
var controller = Controller.instance;
controller.setPack(packName);