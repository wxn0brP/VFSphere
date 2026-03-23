import { createBinValthera } from "@wxn0brp/db-storage-bin";
import { decodeData, encodeData } from "./utils.js";
import { list } from "./list.js";
import { read, write } from "./data.js";
export class VFS {
    opts;
    mgr;
    db;
    constructor(opts = {}) {
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
    async write(collection, data) {
        return await write(this, collection, data);
    }
    async read(collection) {
        return await read(this, collection);
    }
    async delete(collection) {
        if (!collection.startsWith("/"))
            collection = "/" + collection;
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
