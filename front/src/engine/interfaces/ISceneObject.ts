import { Sprite } from "./ISprite";
import { IPosition } from "./Position";

export interface ISceneObject {
    name: string;
    sprite?: Sprite;
    text?: string;
    position: IPosition;
    interact: IInteract;
}

export enum InteractType {
    TAKE = "take",
    FUNCTION = "function",
    TEXT = "text",
    SCENE = "changeScene"
}

export interface BaseInteract<T = InteractType> {
    type: T,
}
export interface functionInteract extends BaseInteract<InteractType.FUNCTION> {
    path: string;
}
export interface takeInteract extends BaseInteract<InteractType.TAKE> {
    item: string;
}
export interface textInteract extends BaseInteract<InteractType.TEXT> {
    text: string;
}
export interface sceneInteract extends BaseInteract<InteractType.SCENE> {
    sceneId: string;
}

export type IInteract = takeInteract | functionInteract | textInteract | sceneInteract;