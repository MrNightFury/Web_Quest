import { Logger } from "../../Logger.ts";

export abstract class Module {
    abstract name: string;
    basePath?: string;
    
    logger = new Logger(this);

    constructor() {

    }

    abstract load(): Promise<void>;

    getBaseModulePath() {
        return import.meta.url;
    }
}