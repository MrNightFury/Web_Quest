var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Scene } from "./Scene.js";
import { FileType } from "./FileType.js";
import { Inventory } from "./Inventory.js";
export class Controller {
    setPack(name) {
        this.packName = name;
        this.loadPackInfo().then(res => {
            $("#mm_item_game_start").on("click", () => {
                this.changeScene();
            });
        });
    }
    /**
     * Saves current scene if needed and loads new scene
     * @param name scene file name without extension
     * @returns
     */
    changeScene(name) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!name) {
                if (!((_a = this.packInfo) === null || _a === void 0 ? void 0 : _a.defaultScene)) {
                    alert("Default scene didn't specified");
                    return;
                }
                name = this.packInfo.defaultScene;
            }
            if ((_b = this.currentScene) === null || _b === void 0 ? void 0 : _b.persistent) {
                this.saveScene();
            }
            let scene = this.savedScenes.filter(item => item.id == name)[0];
            console.log(scene);
            if (scene) {
                this.currentScene = scene;
            }
            else {
                this.currentScene = new Scene(yield this.getPackFile(FileType.SCENE, name));
            }
            this.clearWindow();
            this.currentScene.render();
            // ToRemove
            // this.currentScene.tell();
        });
    }
    /**
     * Function getting function from script inside `scripts` folder
     * @param scriptName
     * @param functionName
     * @returns Specified function
     */
    getFunction(scriptName, functionName) {
        return __awaiter(this, void 0, void 0, function* () {
            let script = yield this.getPackFile(FileType.SCRIPT, scriptName);
            let f = new Function(`
            ${script};
            return ${functionName};
        `);
            return f();
        });
    }
    getPackFileAddress(type, name) {
        return `../content/${this.packName}/${type}${name ? '/' + name : ''}`;
    }
    /**
     * Function fetching specified file inside current pack folder.
     * @param type Specifies subdirectory for search and file extension for some types (scene -> .json)
     * @param name name of required file without extension. Don't specify it for file types that include a single file (e.g. PackInfo)
     * @returns Fetched object
     */
    getPackFile(type, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let path = name;
            if (type == FileType.SCENE || type == FileType.OBJECT) {
                path += ".json";
            }
            return yield fetch(this.getPackFileAddress(type, path)).catch(err => {
                console.log(`Error loading file "${name}" of type "${type}"`);
                console.error(err);
                return null;
            }).then((res) => __awaiter(this, void 0, void 0, function* () {
                switch (type) {
                    case FileType.SCRIPT:
                        return res === null || res === void 0 ? void 0 : res.text();
                }
                return Object.assign(Object.assign({}, yield (res === null || res === void 0 ? void 0 : res.json())), { id: name });
            }));
        });
    }
    clearWindow() {
        $("#game_scene_active_items").empty();
    }
    loadPackInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            this.packInfo = (yield this.getPackFile(FileType.INFO));
        });
    }
    saveScene() {
        if (this.currentScene) {
            this.savedScenes.push(this.currentScene);
        }
    }
    constructor() {
        this.packName = "";
        this.inventory = new Inventory();
        this.savedScenes = [];
    }
}
Controller.instance = new Controller();
