import type { Loader } from "engine/Loader.js";
import type { Module } from "./Module.js";

export class ModulesManager {
    loadedModules: Map<string, Module> = new Map();
    loader: Loader;

    constructor(loader: Loader) {
        this.loader = loader;
    }

    async loadModule(name: string) {
        if (this.loadedModules.has(name)) {
            console.warn("Module already loaded: " + name);
            return;
        }

        
    }
}