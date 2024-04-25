import { Sprite } from "./ISprite";
import { IPosition } from "./Position";

export interface ISceneObject {
    name: string;
    sprite: Sprite;
    position: IPosition;
    interact: IInteract;
}

export enum InteractType {
    TAKE = "take",
    FUNCTION = "function",
    TEXT = "text",
    SCENE = "changeScene"
}

interface BaseInteract<T = InteractType> {
    type: T,
}
interface functionInteract extends BaseInteract<InteractType.FUNCTION> {
    path: string;
}
interface takeInteract extends BaseInteract<InteractType.TAKE> {
    item: string;
}
interface textInteract extends BaseInteract<InteractType.TEXT> {
    text: string;
}
interface sceneInteract extends BaseInteract<InteractType.SCENE> {
    sceneId: string;
}

export type IInteract = takeInteract | functionInteract | textInteract | sceneInteract;