import { VFS } from "./class";

export class FileState {
    path: string;
    lm: number; // last modified
    cr: number; // created

    constructor(path: string, cr: number) {
        this.path = path;
        this.cr = cr;
    }
}

export async function read(cl: VFS, collection: string) {
    if (cl.mgr.meta.collections["$" + collection]) throw new Error(`File ${collection} not found`);

    // TODO rights
    return await cl.mgr.read(collection);
}

export async function write(cl: VFS, collection: string, data: any) {
    // return await cl.mgr.write(collection, data);
    const updated = await cl.db.updateOne<FileState>("%list", { path: collection }, { lm: Date.now() });
    if (!updated) {
        const state = new FileState(collection, Date.now());
        state.lm = Date.now();

        await cl.db.add("%list", state, false);
    }

    return await cl.mgr.write(collection, data);
}