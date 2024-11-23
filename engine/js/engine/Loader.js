import { FileType } from "./interfaces/PackFiles.js";
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
    packName = "";
    packBasePath = "";
    packSources = [];
    constructor() {
        this.updateAvailableSources();
    }
    async findPack(packName) {
        for (const source of this.packSources) {
            const sourceBasePath = (source.type == SourceType.LOCAL ? "file://" + path.resolve(source.basePath) : source.basePath);
            return await fetch(this.getPackFilePath(FileType.PACKINFO, "", sourceBasePath + "/" + packName + "/")).then(async (res) => {
                if (res.status == 200) {
                    this.packBasePath = source.basePath + packName + "/";
                    return await res.json();
                }
            });
        }
    }
    updateAvailableSources() {
        this.packSources = [];
        this.packSources.push({
            basePath: "../content/",
            type: ENV.deno ? SourceType.LOCAL : SourceType.REMOTE
        });
    }
    getPackFilePath(type, name, basePath) {
        const path = basePath ? basePath : this.packBasePath;
        return (() => {
            switch (type) {
                case FileType.PACKINFO:
                    return path + "pack.info";
            }
        })();
    }
    async getPackFile() {
    }
    async loadPackInfo() {
    }
}
