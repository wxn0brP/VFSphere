import * as msgpack from "@msgpack/msgpack";
function isMsgpackData(collection) {
    if (collection === "")
        return true;
    if (collection.startsWith("%"))
        return true;
    return false;
}
export async function encodeData(data, collection) {
    // console.log("encodeData", collection, data.length);
    if (isMsgpackData(collection))
        return msgpack.encode(data);
    return data;
}
export async function decodeData(data, collection) {
    // console.log("decodeData", collection, data.length);
    if (isMsgpackData(collection))
        return msgpack.decode(data);
    return data;
}
