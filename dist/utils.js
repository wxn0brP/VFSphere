import * as msgpack from "@msgpack/msgpack";
const devJson = process.env["VFSPHERE_DEV_JSON"] === "true";
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
        return devJson ? JSON.stringify(data) : msgpack.encode(data);
    return data;
}
export async function decodeData(data, collection) {
    // console.log("decodeData", collection, data.length);
    if (isMsgpackData(collection))
        return devJson ? JSON.parse(data.toString()) : msgpack.decode(data);
    return data;
}
