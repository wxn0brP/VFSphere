import { BinManager, createBinValthera } from "@wxn0brp/db-storage-bin";
import { decodeData, encodeData } from "./utils";
import { list } from "./list";
import { read, write } from "./data";
import { ValtheraClass } from "@wxn0brp/db-core";

export interface VFSOpts {
    file: string;
}

export class VFS {
    public opts: VFSOpts;
    public mgr: BinManager;
    public db: ValtheraClass;

    constructor(opts: Partial<VFSOpts> = {}) {
        this.opts = {
            file: "data.vfsp",
            ...opts
        };
    }

    async init() {
        const { mgr, db } = await createBinValthera(this.opts.file, {
            preferredSize: 128,
            crc: 0,
            format: {
                decode: decodeData,
                encode: encodeData
            }
        });
        this.mgr = mgr;
        this.db = db;
        return this;
    }

    async write(collection: string, data: any) {
        return await write(this, collection, data);
    }

    async read(collection: string) {
        return await read(this, collection);
    }

    async delete(collection: string) {
        if (!collection.startsWith("/")) collection = "/" + collection;
        await this.mgr.removeCollection(collection);
        return await this.db.removeOne("%list", { path: collection });
    }

    async list() {
        return await list(this);
    }

    async close() {
        await this.mgr.close();
    }
}