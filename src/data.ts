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

export async function read(cl: VFS, file: string) {
    if (cl.mgr.meta.collections["/" + file]) throw new Error(`File ${file} not found`);

    // TODO rights
    return await cl.mgr.read(file);
}

export async function write(cl: VFS, file: string, data: any) {
    if (!file) throw new Error("Missing file");
    if (!file.startsWith("/")) file = "/" + file;

    const updated = await cl.db.updateOne<FileState>("%list", { path: file }, { lm: Date.now() });
    if (!updated) {
        const state = new FileState(file, Date.now());
        state.lm = Date.now();

        await cl.db.add("%list", state, false);
    }

    return await cl.mgr.write(file, data);
}