import { FileType } from "./interfaces/PackFileTypes.js";
import { isDeno } from "../Environment.js";
if (isDeno()) {
    // @ts-ignore: 
    var path = await import("jsr:@std/path");
}
export var SourceType;
(function (SourceType) {
    SourceType["LOCAL"] = "local";
    SourceType["REMOTE"] = "remote";
})(SourceType || (SourceType = {}));
export class Loader {
    // packName: string = "";
    packBasePath = "";
    packSources = new Set();
    moduleSources = new Set();
    constructor() {
        this.updateAvailableSources();
    }
    async findPack(packName) {
        for (const source of this.packSources) {
            const sourceBasePath = (source.type == SourceType.LOCAL ? "file://" + path.resolve(source.basePath) : source.basePath);
            const result = await this.getPackFile(FileType.PACKINFO, "", sourceBasePath + "/" + packName + "/");
            if (result) {
                this.packBasePath = sourceBasePath + "/" + packName + "/";
                return result;
            }
        }
    }
    updateAvailableSources() {
        this.packSources.clear();
        this.packSources.add({
            basePath: "../content/",
            type: ENV.deno ? SourceType.LOCAL : SourceType.REMOTE
        });
        this.moduleSources.clear();
        this.moduleSources.add({
            basePath: "../modules/",
            type: ENV.deno ? SourceType.LOCAL : SourceType.REMOTE
        });
    }
    getPackFilePath(type, _name, basePath) {
        const path = basePath ? basePath : this.packBasePath;
        return (() => {
            switch (type) {
                case FileType.PACKINFO:
                    return path + "pack.info";
            }
        })();
    }
    async getPackFile(type, name, basePath) {
        const path = this.getPackFilePath(type, name, basePath);
        const result = await fetch(path).catch(err => {
            console.error(err);
        }).then(async (res) => {
            if (res?.status == 200) {
                return await res;
            }
        });
        if (!result) {
            console.error("File not found: " + path);
            return;
        }
        switch (type) {
            case FileType.PACKINFO:
                return await result.json();
            default:
                return await result.text();
        }
    }
}
