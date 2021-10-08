declare const sortOrder: string[];
declare type Data = Record<string, unknown>;
declare function sortMethod(a: unknown, b: unknown): number;
declare function stringify(data: Data): string;
declare function getAllKeys(data: Data): string[];
