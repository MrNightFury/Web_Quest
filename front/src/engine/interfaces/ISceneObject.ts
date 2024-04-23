import { ISprite } from "./ISprite";

export interface ISceneObject {
    name: string;
    sprite: ISprite;
    interact: IInteract;
}

export enum InteractType {
    TAKE = "take",
    FUNCTION = "function"
}

interface BaseInteract<T = InteractType> {
    type: T
}
interface functionInteract extends BaseInteract<InteractType.FUNCTION> {
    path: string;
}
interface takeInteract extends BaseInteract<InteractType.TAKE> {
    item: string;
}

export type IInteract = takeInteract | functionInteract;