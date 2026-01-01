import { VFS } from "./class.js";
export declare class FileState {
    path: string;
    lm: number;
    cr: number;
    constructor(path: string, cr: number);
}
export declare function read(cl: VFS, file: string): Promise<any>;
export declare function write(cl: VFS, file: string, data: any): Promise<void>;
