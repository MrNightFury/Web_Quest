import { Scene } from "./Scene.js";
import { IPackInfo } from "./interfaces/IPackInfo.js"
import { FileType } from "./FileType.js";
import { IScene } from "./interfaces/IScene.js";

export class Controller {
    static instance = new Controller();

    packName: string = "";
    packInfo?: IPackInfo;
    currentScene?: Scene;

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
            name = this.packInfo?.defaultScene ?? "error";
        }
        this.currentScene = new Scene(await this.getPackFile(FileType.SCENE, `${name}.json`) as IScene);
        this.clearWindow();
        this.currentScene?.render();


        // let f = await this.getFunction("test.js", "interact");
        this.currentScene.tell();
    }

    async getFunction(scriptName: string, functionName: string){
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

    async getPackFile(type: FileType, name?: string) {
        return await fetch(this.getPackFileAddress(type, name)).catch(err => {
            console.log(`Error loading file "${name}" of type "${type}"`);
            return null;
        }).then(async res => {
            switch (type) {
                case FileType.SCRIPT:
                    return res?.text();
            }
            return res?.json();
        })
    }

    clearWindow(){}

    async loadPackInfo() {
        this.packInfo = await this.getPackFile(FileType.INFO) as IPackInfo;
    }

    constructor() {}
}