export var Runtime;
(function (Runtime) {
    Runtime["DENO"] = "Deno";
    Runtime["BROWSER"] = "Browser";
})(Runtime || (Runtime = {}));
export function setupEnv() {
    // @ts-ignore: 
    const isDeno = typeof Deno != "undefined";
    globalThis.ENV = {
        debug: true,
        deno: isDeno,
        browser: !isDeno,
        runtime: isDeno ? Runtime.DENO : Runtime.BROWSER,
        baseImportPath: import.meta.url.replace(/main.[tj]s/g, "")
    };
}
export function isDeno() {
    // @ts-ignore: 
    return typeof Deno != "undefined";
}
