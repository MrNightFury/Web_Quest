import { Controller } from "./Controller.js";
import { FileType } from "./FileType.js";
import { IScene } from "./interfaces/IScene.js";
import { SceneObject } from "./SceneObject.js";

export class Scene {
    id: string = "";
    name: string = "";
    background: string = "";
    persistent: boolean;
    objects: SceneObject[] = [];

    constructor(scene: IScene) {
        this.id = scene.id;
        this.name = scene.name;
        this.background = scene.background;
        this.persistent = scene.persistent;
        scene.objects.forEach((item) => {
            this.objects.push(new SceneObject(item))
        })
    }

    tell() {
        console.log(this.name);
        this.objects.forEach(item => {
            console.log(item.name);
        })
    }

    render() {
        $("#game > .background_img").first().attr("src", Controller.instance.getPackFileAddress(FileType.IMAGE, this.background));
        this.objects.forEach(item => $("#game_scene_active_items").append(item.render()))
    }

    removeObject() {
        
    }
}