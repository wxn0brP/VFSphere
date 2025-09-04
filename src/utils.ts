import * as msgpack from "@msgpack/msgpack";

function isMsgpackData(collection: string) {
    if (collection === "") return true;
    if (collection.startsWith("%")) return true;
    return false;
}

export async function encodeData(data: any, collection: string) {
    // console.log("encodeData", collection, data.length);
    if (isMsgpackData(collection)) return msgpack.encode(data);
    return data;
}

export async function decodeData(data: Buffer, collection: string) {
    // console.log("decodeData", collection, data.length);
    if (isMsgpackData(collection)) return msgpack.decode(data);
    return data;
}