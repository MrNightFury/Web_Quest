export interface IBasePackInfo {
    pfv?: number;

    name: string;
    defaultScene: string;
    authors?: string[];
    backgroundMusic: string;
}

export interface IPackInfov1old extends IBasePackInfo {
    pfv: 0;
}

export interface IPackInfov1 extends IBasePackInfo {
    pfv: 1;
}

export interface IPackInfov2 extends IBasePackInfo {
    pfv: 2;

    modules: string[];
}

export type IPackInfo = IPackInfov1old | IPackInfov1 | IPackInfov2;