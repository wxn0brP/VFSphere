import { readFile, writeFile } from "fs/promises";
import { VFS } from "./class";

const args = process.argv.slice(2);
const vfs = await new VFS().init();

if (args[0] === "add") {
    if (!args[1]) throw new Error("Usage: add <file> [mount]");
    const file = args[1];
    const mount = args[2] || "/" + file.split("/").pop();
    const data = await readFile(file);
    await vfs.write(mount, data);
}
else if (args[0] === "extract") {
    if (!args[1]) throw new Error("Usage: extract <mount> [out file]");
    const mount = args[1];
    const file = args[2] || "." + mount; // ./file
    const data = await vfs.read(mount);
    await writeFile(file, data);
}
else if (args[0] === "delete") {
    if (!args[1]) throw new Error("Usage: delete <mount>");
    await vfs.delete(args[1]);
}
else if (args[0] === "read") {
    if (!args[1]) throw new Error("Usage: read <mount>");
    const data = await vfs.read(args[1]);
    process.stdout.write(data);
}
else if (args[0] === "list")
    console.log(await vfs.list());
else
    console.log(`
Usage:
    add <file> [mount]
    extract <mount> [out file]
    delete <mount>
    read <mount>
    list
`);