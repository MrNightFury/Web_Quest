import { IScene } from "./interfaces/IScene.js";
import { SceneObject } from "./SceneObject.js";

export class Scene {
    id: string = "";
    objects: SceneObject[] = [];
    name: string = "";

    constructor(scene: IScene) {
        this.name = scene.name;
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
        
    }
}