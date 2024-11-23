export var FileType;
(function (FileType) {
    FileType["PACKINFO"] = "pack.info";
})(FileType || (FileType = {}));
export var FileContentType;
(function (FileContentType) {
    FileContentType["JSON"] = "JSON";
    FileContentType["TEXT"] = "TEXT";
})(FileContentType || (FileContentType = {}));
export function getFileContentType(type) {
    switch (type) {
        case FileType.PACKINFO:
            return FileContentType.JSON;
    }
}
