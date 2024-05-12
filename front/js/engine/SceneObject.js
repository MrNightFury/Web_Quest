var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { InteractType } from "./interfaces/ISceneObject.js";
import { Controller } from "./Controller.js";
import { FileType } from "./FileType.js";
export class SceneObject {
    constructor(sceneObject) {
        var _a, _b, _c;
        this.name = "";
        this.position = { x: 0, y: 0 };
        this.text = "";
        this.id = Controller.instance.getNextId();
        // console.log(sceneObject)
        this.name = (_a = sceneObject.name) !== null && _a !== void 0 ? _a : "";
        this.sprite = sceneObject.sprite;
        this.text = (_b = sceneObject.text) !== null && _b !== void 0 ? _b : "";
        this.position = (_c = sceneObject.position) !== null && _c !== void 0 ? _c : this.position;
        this.interactCallback = this.loadInteract(sceneObject.interact);
        // console.log(this.position);
    }
    loadInteract(interact) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!interact)
                return;
            if (Array.isArray(interact)) {
                let funcs = [];
                for (const func of interact) {
                    funcs.push((yield this.loadInteract(func)));
                }
                return funcs;
            }
            switch (interact.type) {
                case InteractType.FUNCTION:
                    let [scriptName, functionName] = interact.path.split('/');
                    return Controller.instance.getFunction(scriptName, functionName);
                case InteractType.TEXT:
                    return () => console.log(interact.text);
                case InteractType.SCENE:
                    return () => Controller.instance.changeScene(interact.sceneId);
                case InteractType.SPAWN:
                    return () => { var _a; return (_a = Controller.instance.currentScene) === null || _a === void 0 ? void 0 : _a.addObject(interact.object); };
                case InteractType.DELETE:
                    return () => {
                        var _a, _b;
                        if (Controller.instance.currentScene)
                            Controller.instance.currentScene.objects = (_a = Controller.instance.currentScene) === null || _a === void 0 ? void 0 : _a.objects.filter(object => object.id != this.id);
                        (_b = this.element) === null || _b === void 0 ? void 0 : _b.remove();
                    };
                case InteractType.TAKE:
                    return function () {
                        var _a, _b, _c;
                        if (Controller.instance.inventory.addItem({ name: this.name, sprite: (_a = this.sprite) !== null && _a !== void 0 ? _a : { path: "", size: 100 } }) != -1) {
                            if (Controller.instance.currentScene)
                                Controller.instance.currentScene.objects = (_b = Controller.instance.currentScene) === null || _b === void 0 ? void 0 : _b.objects.filter(object => object.id != this.id);
                            (_c = this.element) === null || _c === void 0 ? void 0 : _c.remove();
                        }
                    };
            }
            // this.interactCallback();
        });
    }
    render() {
        var _a;
        // <img class="game_item" style="top: 300px; left: 500px; width: 100px; height: 100px;" src="../src/img/item_key.png" data-index=0>
        let item = $(`<div class="game_item" id="game_item_${this.id}">`);
        item.css({
            top: this.position.y + "px",
            left: this.position.x + "px",
        });
        if (this.sprite) {
            let img = $(`<img>`);
            img.css({
                width: typeof this.sprite.size === "object" ? this.sprite.size.x + "px" : this.sprite.size + "px",
                height: typeof this.sprite.size === "object" ? this.sprite.size.y + "px" : this.sprite.size + "px"
            });
            img.attr("src", Controller.instance.getPackFileAddress(FileType.IMAGE, (_a = this.sprite) === null || _a === void 0 ? void 0 : _a.path));
            item.append(img);
        }
        //  else {
        //     item.append($("<span>").html("Text"));
        // }
        if (this.text) {
            item.append($("<span class='gi_text'>").css({ width: "300px" }).html(this.text));
        }
        this.interactCallback.then(callback => {
            if (!callback)
                return;
            item.css("cursor", "pointer");
            item.on("click", () => {
                if (Array.isArray(callback)) {
                    for (const func of callback) {
                        // console.log(func)
                        func.bind(Object.assign(Object.assign({}, this), { Controller: Controller.instance }))(Controller.instance.inventory.selectedItem);
                    }
                }
                else {
                    callback.bind(Object.assign(Object.assign({}, this), { Controller: Controller.instance }))(Controller.instance.inventory.selectedItem);
                }
            });
        });
        this.element = item;
        return item;
    }
}
