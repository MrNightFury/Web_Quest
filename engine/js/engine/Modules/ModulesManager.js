export class ModulesManager {
    loadedModules = new Map();
    loader;
    constructor(loader) {
        this.loader = loader;
    }
    async loadModule(name) {
        if (this.loadedModules.has(name)) {
            console.warn("Module already loaded: " + name);
            return;
        }
    }
}
