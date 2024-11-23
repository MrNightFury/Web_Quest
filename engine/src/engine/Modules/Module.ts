export abstract class Module {
    abstract name: string;

    abstract load(): Promise<void>;
    abstract unload(): Promise<void>;
}