import { Loader } from "./Loader";
import { ModulesManager } from "./Modules/ModulesManager";
import { IPackInfo } from "./interfaces/IPackInfo";

export class Engine {
    packLoaded: boolean = false;

    packInfo?: IPackInfo;
    loader = new Loader();
    modulesManager = new ModulesManager(this.loader);

    constructor() {

    }

    async loadPack(packName: string) {
        this.packInfo = await this.loader.findPack(packName);
        if (!this.packInfo) {
            console.error("Pack not found: " + packName);
            return;
        }

        this.packLoaded = true;
        this.loader
        console.log("Pack loaded: " + this.packInfo.name);

        if (this.packInfo.pfv == undefined) {
            console.warn("Pack version not found. Fallback to v1.");
            (this.packInfo as any).pfv = 1;
        }

        if (this.packInfo.pfv == 1) {
            this.modulesManager.loadModule("CompModule");
            return;
        }
    }
}