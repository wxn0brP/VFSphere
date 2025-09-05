export async function list(cl) {
    const collections = await cl.db.find("%list");
    return collections
        .map((collection) => collection.path);
}
