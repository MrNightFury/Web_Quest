import { ISceneObject } from "./ISceneObject";

export interface IScene {
    id: string;
    name: string;
    entryText?: string;
    background: string;
    persistent: boolean;
    objects: ISceneObject[];
}