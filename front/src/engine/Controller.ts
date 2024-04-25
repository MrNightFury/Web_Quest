import { Scene } from "./Scene.js";
import { IPackInfo } from "./interfaces/IPackInfo.js"
import { FileType } from "./FileType.js";
import { IScene } from "./interfaces/IScene.js";

export class Controller {
    static instance = new Controller();

    packName: string = "";
    packInfo?: IPackInfo;
    currentScene?: Scene;

    savedScenes: Scene[] = [];

    setPack(name: string) {
        this.packName = name;
        
        this.loadPackInfo().then(res => {
            $("#mm_item_game_start").on("click", () => {
                this.loadScene();
            })
        });
    } 

    async loadScene(name?: string) {
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
        console.log(scene)

        if (scene) {
            this.currentScene = scene;
        } else {
            this.currentScene = new Scene(await this.getPackFile(FileType.SCENE, `${name}`) as IScene);
        }
        
        this.clearWindow();
        this.currentScene.render();
        
        // ToRemove
        // this.currentScene.tell();
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
        if (type == FileType.SCENE) {
            path += ".json";
        }
        return await fetch(this.getPackFileAddress(type, path)).catch(err => {
            console.log(`Error loading file "${name}" of type "${type}"`);
            console.error(err);
            return null;
        }).then(async res => {
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
        this.packInfo = await this.getPackFile(FileType.INFO) as IPackInfo;
    }

    saveScene() {
        if (this.currentScene) {
            this.savedScenes.push(this.currentScene);
        }
    }

    constructor() {}
}