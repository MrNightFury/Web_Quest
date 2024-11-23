export enum FileType {
    PACKINFO = "pack.info"
}

export enum FileContentType {
    JSON = "JSON",
    TEXT = "TEXT"
}

export function getFileContentType(type: FileType): FileContentType {
    switch (type) {
        case FileType.PACKINFO:
            return FileContentType.JSON;
    }
}