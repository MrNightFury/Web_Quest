import { FileType } from "./interfaces/PackFileTypes.ts";
import { isDeno } from "../Environment.js";
import type { IPackInfo } from "engine/interfaces/IPackInfo.js";

if (isDeno()) {
    // @ts-ignore: 
    var path = await import("jsr:@std/path");
}

export enum SourceType {
    LOCAL = "local",
    REMOTE = "remote"
}

export interface Source {
    basePath: string;
    type: SourceType;
}

export class Loader {
    packName: string = "";
    packBasePath: string = "";

    packSources: Set<Source> = new Set();
    moduleSources: Set<Source> = new Set();

    constructor() {
        this.updateAvailableSources()
    }

    async findPack(packName: string) {
        for (const source of this.packSources) {
            const sourceBasePath = (source.type == SourceType.LOCAL ? "file://" + path.resolve(source.basePath) : source.basePath);
            
            // const result = await fetch(this.getPackFilePath(FileType.PACKINFO, "", sourceBasePath + "/" + packName + "/")).catch(err => {
            //     console.error(err);
            // }).then(async res => {
            //     if (res?.status == 200) {
            //         this.packBasePath = source.basePath + packName + "/";
            //         return await res.json() as IPackInfo;
            //     }
            // })

            const result = await this.getPackFile(FileType.PACKINFO, "", sourceBasePath + "/" + packName + "/");

            if (result) {
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

    getPackFilePath(type: FileType, _name?: string, basePath?: string) {
        const path = basePath ? basePath : this.packBasePath;

        return (() => {switch (type) {
            case FileType.PACKINFO:
                return path + "pack.info";
        }})()
    }

    async getPackFile(type: FileType, name?: string, basePath?: string) {
        const path = this.getPackFilePath(type, name, basePath);

        const result = await fetch(path).catch(err => {
            console.error(err);
        }).then(async res => {
            if (res?.status == 200) {
                return await res;
            }
        })

        if (!result) {
            console.error("File not found: " + path);
            return;
        }

        switch (type) {
            case FileType.PACKINFO:
                return await result.json() as IPackInfo;
            default: 
                return await result.text();
        }
    }
}