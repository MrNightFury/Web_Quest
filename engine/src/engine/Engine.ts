import { Loader } from "engine/Loader.ts";
import { ModulesManager } from "engine/Modules/ModulesManager.ts";
import { IPackInfo } from "engine/interfaces/IPackInfo.ts";
import { Logger } from "../Logger.ts";

export class Engine {
    static instance: Engine;

    packLoaded: boolean = false;

    packInfo?: IPackInfo;
    loader = new Loader();
    modulesManager = new ModulesManager(this.loader);

    logger = new Logger(this);

    constructor() {
        this.logger.log("Engine starting...");
        Engine.instance = this;
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

        if (this.packInfo.pfv == 1 || this.packInfo.pfv == undefined) {
            // TODO: compability with old packs
            // this.modulesManager.loadModule("CompModule");
        } else {
            await this.modulesManager.loadModules(this.packInfo.modules);
        }

        
    }
}