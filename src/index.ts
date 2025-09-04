import { VFS } from "./class";

const vfs = await new VFS().init();

// write
await vfs.write("/test", "test data");

// read file
console.log(await vfs.read("/test").then((data) => Buffer.from(data).toString()));

// list
console.log(await vfs.list())