declare global {
    var ENV: ENV;
}

export enum Runtime {
    DENO = "Deno",
    BROWSER = "Browser"
}

export interface ENV {
    deno: boolean;
    browser: boolean;
    runtime: Runtime;
    baseImportPath: string;
}

export function setupEnv() {
    const isDeno = typeof Deno != "undefined";
    globalThis.ENV = {
        deno: isDeno,
        browser: !isDeno,
        runtime: isDeno ? Runtime.DENO : Runtime.BROWSER,
        baseImportPath: import.meta.url.replace(/main.[tj]s/g, "")
    }
}
