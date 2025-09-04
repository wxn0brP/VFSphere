import { VFS } from "./class";

const vfs = await new VFS().init();

function space() {
    console.log("=-".repeat(20) + "=");
}

// write
await vfs.write("/test", "test data");

// read file
space();
console.log("Read:");
console.log(await vfs.read("/test").then((data) => Buffer.from(data).toString()));

// list
space();
console.log("List:");
console.log(await vfs.list())

// console.log(vfs.mgr.meta.collections)
// console.log(vfs.db.find)

const raw = await Promise.all(vfs.mgr.meta.collections.map(async (collection) => {
    return await vfs.mgr.read(collection.name);
}));

space();
console.log(raw.length);
raw.forEach((data, i) => {
    console.log("Read:", i, data.length);
    if (Buffer.isBuffer(data)) console.log(Buffer.from(data).toString());
    else console.log(data);
})