import { ISprite } from "./interfaces/ISprite.js"
import { IPosition } from "./interfaces/IPosition.js";
import { IInteract, InteractType, ISceneObject } from "./interfaces/ISceneObject.js";
import { Controller } from "./Controller.js";

export class SceneObject {
    id: string = "";
    position: IPosition = {x: 0, y: 0, zIndex: 0};
    sprite: ISprite = new ISprite();
    name: string = "";
    interactCallback: Function = ()=>{};

    constructor(sceneObject: ISceneObject) {
        this.name = sceneObject.name;
        this.loadInteract(sceneObject.interact);
    }

    async loadInteract(interact: IInteract) {
        switch (interact.type) {
            case InteractType.FUNCTION:
                let [scriptName, functionName] = interact.path.split('/');
                this.interactCallback = await Controller.instance.getFunction(scriptName, functionName);
        }
        this.interactCallback();
    }
}