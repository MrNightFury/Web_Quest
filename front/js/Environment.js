export var Runtime;
(function (Runtime) {
    Runtime["DENO"] = "Deno";
    Runtime["BROWSER"] = "Browser";
})(Runtime || (Runtime = {}));
export function setupEnv() {
    globalThis.ENV = {
        runtime: Deno ? Runtime.DENO : Runtime.BROWSER
    };
}
