declare type Data = Record<string, unknown>;
export default class JSWS {
    private sortOrder;
    constructor(sortOrder?: string[]);
    sortMethod(a: unknown, b: unknown): number;
    stringify(data: Data): string;
    getAllKeys(data: Data): string[];
}
export {};
