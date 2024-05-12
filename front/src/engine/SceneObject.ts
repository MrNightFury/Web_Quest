import { Sprite } from "./interfaces/ISprite.js"
import { IPosition } from "./interfaces/Position.js";
import { IInteract, InteractType, ISceneObject } from "./interfaces/ISceneObject.js";
import { Controller } from "./Controller.js";
import { FileType } from "./FileType.js";

export class SceneObject {
    id: number;
    sprite?: Sprite;
    name: string = "";
    position: IPosition = { x: 0, y: 0 };
    interactCallback: Promise<Function[] | Function | void>;
    text = "";

    element?: JQuery<HTMLElement>;

    constructor(sceneObject: ISceneObject) {
        this.id = Controller.instance.getNextId();
        // console.log(sceneObject)
        this.name = sceneObject.name ?? "";
        this.sprite = sceneObject.sprite;
        this.text = sceneObject.text ?? "";
        this.position = sceneObject.position ?? this.position;
        this.interactCallback = this.loadInteract(sceneObject.interact);
        // console.log(this.position);
    }

    async loadInteract(interact: IInteract | IInteract[]): Promise<Function[] | Function | void> {
        if (!interact) return;
        if (Array.isArray(interact)) {
            let funcs: Function[] = [];
            for (const func of interact) {
                funcs.push((await this.loadInteract(func)) as unknown as Function)
            }
            return funcs;
        }

        switch (interact.type) {
            case InteractType.FUNCTION:
                let [scriptName, functionName] = interact.path.split('/');
                return Controller.instance.getFunction(scriptName, functionName);
            case InteractType.TEXT:
                return () => console.log(interact.text);
            case InteractType.SCENE:
                return async () => await Controller.instance.changeScene(interact.sceneId);
            case InteractType.SPAWN:
                return () => Controller.instance.currentScene?.addObject(interact.object);
            case InteractType.DELETE:
                return () => {
                    if (Controller.instance.currentScene)
                        Controller.instance.currentScene.objects = Controller.instance.currentScene?.objects.filter(object => object.id != this.id);
                    this.element?.remove();
                }
            case InteractType.TAKE:
                return function (this: SceneObject) {
                    if (Controller.instance.inventory.addItem({ name: this.name, sprite: this.sprite ?? {path: "", size: 100}}) != -1){
                        if (Controller.instance.currentScene)
                            Controller.instance.currentScene.objects = Controller.instance.currentScene?.objects.filter(object => object.id != this.id);
                        this.element?.remove();
                    }
                }
        }
        // this.interactCallback();
    }

    render() {
        // <img class="game_item" style="top: 300px; left: 500px; width: 100px; height: 100px;" src="../src/img/item_key.png" data-index=0>
        let item: JQuery<HTMLElement> = $(`<div class="game_item" id="game_item_${this.id}">`);
        item.css({
            top: this.position.y + "px",
            left: this.position.x + "px",
        })
        if (this.sprite){
            let img = $(`<img>`);
            img.css({
                width: typeof this.sprite.size === "object" ? this.sprite.size.x + "px" : this.sprite.size + "px",
                height: typeof this.sprite.size === "object" ? this.sprite.size.y + "px" : this.sprite.size + "px"
            });
            img.attr("src", Controller.instance.getPackFileAddress(FileType.IMAGE, this.sprite?.path));
            item.append(img);
        }
        //  else {
        //     item.append($("<span>").html("Text"));
        // }
        if (this.text) {
            item.append($("<span class='gi_text'>").css({ width: "300px" }).html(this.text));
        }

        this.interactCallback.then(callback => {
            if (!callback) return;
            item.css("cursor", "pointer");
            item.on("click", async () => {
                if (Array.isArray(callback)) {
                    for (const func of callback) {
                        // console.log(func)
                        await func.bind({...this, Controller: Controller.instance})(Controller.instance.inventory.selectedItem);
                    }
                } else {
                    await callback.bind({...this, Controller: Controller.instance})(Controller.instance.inventory.selectedItem);
                }
            });
        });
        
        this.element = item;
        return item;
    }
}