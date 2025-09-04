# VFSphere

VFSphere is a virtual file system implementation for Node.js that allows you to store and manage files in a single data file. It provides a simple API for adding, extracting, and listing files within the virtual file system.

## Features

- Store multiple files in a single virtual file system
- Simple command-line interface for basic operations
- Programmatic API for integration into Node.js applications
- Uses efficient binary storage with Msgpack serialization for metadata

## Installation

```bash
yarn add github:wxn0brp/VFSphere#dist
```

## Usage

### Programmatic API

VFSphere can also be used programmatically in your Node.js applications:

```javascript
import { VFS } from "./src/class";

// Initialize the virtual file system
const vfs = await new VFS().init();

// Write data to a file
await vfs.write("/test", "test data");

// Read data from a file
const data = await vfs.read("/test");

// List all files
const files = await vfs.list();

// Close the file system
await vfs.close();
```

### Command Line Interface

The VFSphere CLI provides basic file operations:

Examples:
```bash
# Add a file, automatically mounting at root with filename
node dist/cli.js add myfile.txt

# Add a file at a specific mount point
node dist/cli.js add myfile.txt /documents/myfile.txt

# Extract a file
node dist/cli.js extract /documents/myfile.txt myfile_extracted.txt

# List all files
node dist/cli.js list
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.