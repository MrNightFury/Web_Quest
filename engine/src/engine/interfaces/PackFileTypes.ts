export enum FileType {
    PACK_INFO = "pack.info",
    MODULE_INFO = "module.info",
}

export enum FileContentType {
    JSON = "JSON",
    TEXT = "TEXT"
}

export function getFileContentType(type: FileType): FileContentType {
    switch (type) {
        case FileType.PACK_INFO:
        case FileType.MODULE_INFO:
            return FileContentType.JSON;

        default:
            return FileContentType.TEXT;
    }
}