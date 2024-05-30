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
import { AudioController } from "./AudioController.js";
export class Controller {
    setPack(name) {
        return __awaiter(this, void 0, void 0, function* () {
            this.packName = name;
            yield this.loadPackInfo().then(res => {
                if (this.packInfo) {
                    $("#mm_item_game_start").on("click", () => {
                        this.changeScene();
                    });
                    setTimeout(() => {
                        if (this.packInfo && this.packInfo.backgroundMusic) {
                            this.audio.setBackground(this.packInfo.backgroundMusic);
                        }
                    }, 1000);
                }
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
            this.clearWindow();
            if (scene) {
                this.currentScene = scene;
                this.currentScene.render(true);
            }
            else {
                this.currentScene = new Scene(yield this.getPackFile(FileType.SCENE, name));
                this.currentScene.render();
            }
            if (this.currentScene.entryScript) {
                let [scriptName, functionName] = this.currentScene.entryScript.split('/');
                (yield this.getFunction(scriptName, functionName))
                    .bind({ Controller: Controller.instance })();
            }
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
            let address = this.getPackFileAddress(type, path);
            return yield fetch(address).catch(err => {
                console.log(`Error loading file "${address}" of type "${type}"`);
                console.error(err);
                return null;
            }).then((res) => __awaiter(this, void 0, void 0, function* () {
                if ((res === null || res === void 0 ? void 0 : res.status) == 404) {
                    console.log(`Error loading file "${address}" of type "${type}"`);
                    return null;
                }
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
            this.packInfo = (yield this.getPackFile(FileType.INFO).then(res => {
                if (!res) {
                    console.log(`Error loading pack ${this.packName}: PackInfo file is not found`);
                    return null;
                }
                return res;
            }));
            if (this.packInfo.authors) {
                $("#mm_authors").empty();
                for (let item of this.packInfo.authors) {
                    $("#mm_authors").append($(`<h2 class='mm_text'>${item}</h2>`));
                }
            }
        });
    }
    saveScene() {
        if (this.currentScene) {
            this.lastSavedScene = this.currentScene.id;
            this.savedScenes.push(this.currentScene);
        }
    }
    getNextId() {
        return ++this.lastId;
    }
    clearSave() {
        this.savedScenes = [];
    }
    constructor() {
        this.audio = AudioController.instance;
        this.savedState = {};
        this.packName = "";
        this.inventory = new Inventory();
        this.savedScenes = [];
        this.lastId = 0;
    }
}
Controller.instance = new Controller();
