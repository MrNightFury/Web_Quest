import { Window } from "./Window.js";

declare global {
    var ENV: ENV;
}

export enum Runtime {
    DENO = "Deno",
    BROWSER = "Browser"
}

export interface ENV {
    debug: boolean;

    webview?: Window;

    deno: boolean;
    browser: boolean;
    runtime: Runtime;
    baseImportPath: string;
}

export function setupEnv() {
    // @ts-ignore: 
    const isDeno = typeof Deno != "undefined";
    globalThis.ENV = {
        debug: true,

        deno: isDeno,
        browser: !isDeno,
        runtime: isDeno ? Runtime.DENO : Runtime.BROWSER,
        baseImportPath: import.meta.url.replace(/main.[tj]s/g, "")
    }
}

export function isDeno() {
    // @ts-ignore: 
    return typeof Deno != "undefined";
}
