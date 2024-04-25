import { ISceneObject } from "./ISceneObject";

export interface IScene {
    id: string;
    name: string;
    background: string;
    persistent: boolean;
    objects: ISceneObject[];
}