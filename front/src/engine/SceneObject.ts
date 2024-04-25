import { Sprite } from "./interfaces/ISprite.js"
import { IPosition } from "./interfaces/Position.js";
import { IInteract, InteractType, ISceneObject } from "./interfaces/ISceneObject.js";
import { Controller } from "./Controller.js";
import { FileType } from "./FileType.js";

export class SceneObject {
    id: string = "";
    sprite?: Sprite;
    name: string = "";
    position: IPosition = { x: 0, y: 0 };
    interactCallback: Function = ()=>{};

    element?: JQuery<HTMLElement>;

    constructor(sceneObject: ISceneObject) {
        // console.log(sceneObject)
        this.name = sceneObject.name;
        this.sprite = sceneObject.sprite;
        this.position = sceneObject.position ?? this.position;
        this.loadInteract(sceneObject.interact);
        // console.log(this.position);
    }

    async loadInteract(interact: IInteract) {
        switch (interact.type) {
            case InteractType.FUNCTION:
                let [scriptName, functionName] = interact.path.split('/');
                this.interactCallback = await Controller.instance.getFunction(scriptName, functionName);
                break;
            case InteractType.TEXT:
                this.interactCallback = () => console.log(interact.text);
                break;
            case InteractType.SCENE:
                this.interactCallback = () => Controller.instance.loadScene(interact.sceneId);
                break;
            case InteractType.TAKE:
                this.interactCallback = function (this: SceneObject) {
                    if (Controller.instance.currentScene)
                        Controller.instance.currentScene.objects = Controller.instance.currentScene?.objects.filter(object => object.name != this.name);
                    this.element?.remove();
                }
                break;
        }
        // this.interactCallback();
    }

    render() {
        // <img class="game_item" style="top: 300px; left: 500px; width: 100px; height: 100px;" src="../src/img/item_key.png" data-index=0>
        let item: JQuery<HTMLElement>;
        if (this.sprite){
            item = $(`<img class='game_item' id="game_item_${this.id}">`);
            item.css({
                top: this.position.y + "px",
                left: this.position.x + "px",
                width: "100px",
                height: "100px"
            });
            item.attr("src", Controller.instance.getPackFileAddress(FileType.IMAGE, this.sprite?.path));
        } else {
            item = $("<span>");
        }
        item.on("click", () => {
            this.interactCallback.bind(this)();
        });
        this.element = item;
        return item;
    }
}