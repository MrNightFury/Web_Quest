// @ts-ignore:
import { Webview } from "@webview/webview";
// @ts-ignore:
import * as path from "https://deno.land/std@0.224.0/path/mod.ts";

export declare interface Window {
    navigate(url: string): void;
    run(): void;
}

export class Window extends Webview {
    // @ts-ignore:
    ffi = Deno.dlopen("C:\\Windows\\System32\\user32.dll", {
        "MoveWindow": { parameters: ["pointer", "i32", "i32", "i32", "i32", "i32"], result: "i32" },
        "GetForegroundWindow": { parameters: [], result: "pointer" },
    }).symbols;

    constructor(debug: boolean) {
        super(debug);
    }

    openLocal(filePath: string) {
        this.navigate("file://" + path.resolve(filePath));
    }

    moveWindow(x: number, y: number) {
        this.ffi.MoveWindow(this.ffi.GetForegroundWindow(), x, y, 800, 600, 1);
    }
}