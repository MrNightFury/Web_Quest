var _a;
import { Controller } from "./engine/Controller.js";
let urlParams = new URLSearchParams(window.location.search);
let packName = (_a = urlParams.get("pack")) !== null && _a !== void 0 ? _a : "Escape From Darkness";
console.log(packName);
var controller = Controller.instance;
controller.setPack(packName);
alert("Внимание, движок находится на ранней стадии разработки, поэтому будьте готовы к шоколадкам");
