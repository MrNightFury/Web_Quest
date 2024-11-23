import { Loader } from "./Loader.js";
export class Engine {
    loader = new Loader();
    constructor() {
    }
    async loadPack(packName) {
        return await this.loader.findPack(packName);
    }
}
