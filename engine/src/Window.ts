import { Webview } from "@webview/webview";
import * as path from "https://deno.land/std@0.224.0/path/mod.ts";


export class Window extends Webview {
    constructor(debug: boolean) {
        super(debug);
    }

    openLocal(filePath: string) {
        this.navigate("file://" + path.resolve(filePath));
    }
}