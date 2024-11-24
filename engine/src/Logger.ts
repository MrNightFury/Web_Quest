export class Logger {
    label: string;

    // deno-lint-ignore no-explicit-any
    constructor(cls: any) {
        this.label = cls.constructor.name;

        // if (cls.prototype) {
        //     this.label = cls.prototype.name
        // }
        if ("id" in cls) {
            this.label += " " + cls.id;
        }
    }
    
    log(message: string) {
        console.log(`[${this.label}] ${message}`);
    }

    warn(message: string) {
        console.warn(`[${this.label}] ${message}`);
    }

    error(message: string) {
        console.error(`[${this.label}] ${message}`);
    }
}