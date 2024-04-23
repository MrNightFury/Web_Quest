import { ISceneObject } from "./ISceneObject";

export interface IScene {
    name: string;
    objects: ISceneObject[];
}