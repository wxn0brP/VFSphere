import { VFS } from "./class";

export async function list(cl: VFS) {
    const collections = await cl.db.find<{ path: string }>("%list");
    return collections
        .map((collection) => collection.path)
}