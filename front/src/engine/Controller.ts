import { Scene } from "./Scene.js";
import { IPackInfo } from "./interfaces/IPackInfo.js"
import { FileType } from "./FileType.js";
import { IScene } from "./interfaces/IScene.js";
import { Inventory } from "./Inventory.js";
import { AudioController } from "./AudioController.js";

export class Controller {
    static instance = new Controller();
    audio = AudioController.instance;
    
    savedState: any = {};

    packName: string = "";
    packInfo?: IPackInfo;
    currentScene?: Scene;

    inventory = new Inventory();
    savedScenes: Scene[] = [];

    loadingPromise?: Promise<any>;
    lastSavedScene?: string;

    lastId: number = 0;

    async setPack(name: string) {
        this.packName = name;
        
        await this.loadPackInfo().then(res => {
            if (this.packInfo) {
                $("#mm_item_game_start").on("click", () => {
                    this.changeScene();
                })
                setTimeout(() => {
                    if (this.packInfo && this.packInfo.backgroundMusic) {
                        this.audio.setBackground(this.packInfo.backgroundMusic);
                    }
                }, 1000)
            }
        });
    }

    /**
     * Saves current scene if needed and loads new scene
     * @param name scene file name without extension
     * @returns
     */
    async changeScene(name?: string) {
        if (!name) {
            if (!this.packInfo?.defaultScene) {
                alert("Default scene didn't specified");
                return;
            }
            name = this.packInfo.defaultScene;
        }
        if (this.currentScene?.persistent) {
            this.saveScene();
        }

        let scene = this.savedScenes.filter(item => item.id == name)[0];

        this.clearWindow();
        if (scene) {
            this.currentScene = scene;
            this.currentScene.render(true);
        } else {
            this.currentScene = new Scene(await this.getPackFile(FileType.SCENE, name) as IScene);
            this.currentScene.render();
        }
        if (this.currentScene.entryScript) {
            let [scriptName, functionName] = this.currentScene.entryScript.split('/');
            (await this.getFunction(scriptName, functionName))
                .bind({Controller: Controller.instance})();
        }
    }

    /**
     * Function getting function from script inside `scripts` folder
     * @param scriptName 
     * @param functionName 
     * @returns Specified function
     */
    async getFunction(scriptName: string, functionName: string) {
        let script = await this.getPackFile(FileType.SCRIPT, scriptName);
        let f = new Function(`
            ${script};
            return ${functionName};
        `);
        return f();
    }

    getPackFileAddress(type: FileType, name?: string) {
        return `../content/${this.packName}/${type}${name ? '/' + name : ''}`;
    }

    /**
     * Function fetching specified file inside current pack folder.
     * @param type Specifies subdirectory for search and file extension for some types (scene -> .json)
     * @param name name of required file without extension. Don't specify it for file types that include a single file (e.g. PackInfo)
     * @returns Fetched object
     */
    async getPackFile(type: FileType, name?: string) {
        let path = name;
        if (type == FileType.SCENE || type == FileType.OBJECT) {
            path += ".json";
        }
        let address = this.getPackFileAddress(type, path);
        return await fetch(address).catch(err => {
            console.log(`Error loading file "${address}" of type "${type}"`);
            console.error(err);
            return null;
        }).then(async res => {
            if (res?.status == 404) {
                console.log(`Error loading file "${address}" of type "${type}"`);
                return null;
            }
            switch (type) {
                case FileType.SCRIPT:
                    return res?.text();
            }
            return {...await res?.json(), id: name};
        })
    }

    clearWindow(){
        $("#game_scene_active_items").empty();
    }

    async loadPackInfo() {
        this.packInfo = await this.getPackFile(FileType.INFO).then(res => {
            if (!res) {
                console.log(`Error loading pack ${this.packName}: PackInfo file is not found`);
                return null;
            }
            return res;
        }) as IPackInfo;

        if (this.packInfo.authors) {
            $("#mm_authors").empty();
            for (let item of this.packInfo.authors) {
                $("#mm_authors").append($(`<h2 class='mm_text'>${item}</h2>`));
            }
        }
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

    constructor() {}
}