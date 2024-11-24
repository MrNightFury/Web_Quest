import type { Loader } from "engine/Loader.ts";
import { Module } from "engine/Modules/Module.ts";
import { Logger } from "../../Logger.ts";


// deno-lint-ignore no-explicit-any
function isSubclass(subclass: any, superclass: any): boolean {
    let proto = subclass;
    while (proto) {
        proto = Object.getPrototypeOf(proto);
        if (proto === superclass) {
            return true;
        }
    }
    return false;
}

export class ModulesManager {
    loadedModules: Map<string, Module> = new Map();
    loader: Loader;

    logger = new Logger(this);

    constructor(loader: Loader) {
        this.loader = loader;
    }

    async loadModule(name: string) {
        if (this.loadedModules.has(name)) {
            this.logger.warn("Module already loaded: " + name);
            return;
        }

        const modulePath = await this.loader.findModule(name);
        if (!modulePath) {
            this.logger.error("Module not found: " + name);
            return;
        }

        this.logger.log("Loading module: " + name);
        const module = await import(modulePath + "mod.ts");
        for (const key in module) {
            if (isSubclass(module[key], Module)) {
                const moduleInstance = new module[key]();
                await moduleInstance.load();
                this.loadedModules.set(name, moduleInstance);
            }
        }
    }

    async loadModules(names: string[]) {
        for (const name of names) {
            await this.loadModule(name);
        }
    }
}