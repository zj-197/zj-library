export interface Options {
    out: string;
    src: string;
    titleMap?: Record<string, string>;
    isOutputSingle?: boolean;
    outputSingleConfig?: {
        fileName?: string;
        h1?: string;
        desc?: string;
    };
}
export declare function generate(options: Options): void;
