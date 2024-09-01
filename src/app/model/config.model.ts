export interface Configuration {
    id?: number;
    key: string;
    value: string;
    secret?: boolean;
}
export interface Translation {
    id?: number;
    lang: string;
    langStr: string;
    txJson?: string;
    newRec?: boolean;
}

export interface KeyVal {
    key: string;
    value: string;
    dirty?: boolean;
}