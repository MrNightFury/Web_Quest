import { Sprite } from "./ISprite";
import { IPosition } from "./Position";

export interface ISceneObject {
    name?: string;
    sprite?: Sprite;
    text?: string;
    position: IPosition;
    interact: IInteract | IInteract[];
}

export interface ISceneObjectRef {
    ref: string;
    position: IPosition;
}

export enum InteractType {
    TAKE = "take",
    FUNCTION = "function",
    TEXT = "text",
    SCENE = "changeScene",
    SPAWN = "spawn",
    DELETE = "delete"
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

export interface spawnInteract extends BaseInteract<InteractType.SPAWN> {
    object: string;
}

export interface deleteInteract extends BaseInteract<InteractType.DELETE> {

}

export type IInteract = takeInteract | functionInteract | textInteract | sceneInteract | spawnInteract | deleteInteract;