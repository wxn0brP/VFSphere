import { BinManager } from "@wxn0brp/db-storage-bin";
import { ValtheraClass } from "@wxn0brp/db-core";
export interface VFSOpts {
    file: string;
}
export declare class VFS {
    opts: VFSOpts;
    mgr: BinManager;
    db: ValtheraClass;
    constructor(opts?: Partial<VFSOpts>);
    init(): Promise<this>;
    write(collection: string, data: any): Promise<void>;
    read(collection: string): Promise<any>;
    delete(collection: string): Promise<boolean>;
    list(): Promise<string[]>;
    close(): Promise<void>;
}
