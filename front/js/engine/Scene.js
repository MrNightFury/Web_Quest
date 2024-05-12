import { Controller } from "./Controller.js";
import { FileType } from "./FileType.js";
import { SceneObject } from "./SceneObject.js";
export class Scene {
    constructor(scene) {
        var _a;
        this.id = "";
        this.name = "";
        this.background = "";
        this.objects = [];
        this.id = scene.id;
        this.name = scene.name;
        this.entryText = (_a = scene.entryText) !== null && _a !== void 0 ? _a : "";
        this.entryScript = scene.entryScript;
        this.background = scene.background;
        this.persistent = scene.persistent;
        scene.objects.forEach((item) => {
            if (typeof item === "string") {
                this.addObject(item);
            }
            else {
                this.objects.push(new SceneObject(item));
            }
        });
    }
    tell() {
        console.log(this.name);
        this.objects.forEach(item => {
            console.log(item.name);
        });
    }
    render(isSaved = false) {
        $("#game > .background_img").first().attr("src", Controller.instance.getPackFileAddress(FileType.IMAGE, this.background));
        this.objects.forEach(item => $("#game_scene_active_items").append(item.render()));
        $("#game_text_container > .height_keeper").html(this.entryText);
        if (this.entryText && !isSaved) {
            $("#game_text_container").removeClass("hidden");
            window.gameTextResize();
            $("#game_text_opener").addClass("opened");
        }
        else {
            $("#game_text_container").addClass("hidden");
            window.gameTextResize();
            $("#game_text_opener").removeClass("opened");
        }
    }
    addObject(name) {
        // console.log(name);
        Controller.instance.getPackFile(FileType.OBJECT, name).then(object => {
            this.objects.push(new SceneObject(object));
            $("#game_scene_active_items").append(this.objects[this.objects.length - 1].render());
        });
    }
    removeObject(name) {
        var _a;
        let i = this.objects.findIndex(item => { console.log(item.name, name, item.name == name); return item.name == name; });
        console.log(i, this.objects[i]);
        (_a = this.objects[i].element) === null || _a === void 0 ? void 0 : _a.remove();
        this.objects.splice(i, 1);
    }
}
