let CORE = require("./core.js");
let File = java.io.File;
let Files = java.nio.file.Files;

function storage(path) {
    let _File = File(path);
    if(!_File.exists()) return -1;
    let bytesList = DirectoryReader(path);
    let bytes = 0; bytesList.map(e => bytes += e.bytes.length);
    return CORE(bytes);
}

let DirectoryReader = /** @classes */ function (directoryPath) {
    let directory = new File(directoryPath);
    
    let bytes = [];

    if(directory.exists() && directory.isDirectory()) {
        for(let file of directory.listFiles()) {
            if(file.isFile()) {
                let fileBytes = Files.readAllBytes(file.toPath());
                bytes.push({
                    path: file.toPath().toString(),
                    name: file.getName(),
                    bytes: fileBytes
                });
            }else if(file.isDirectory()) {
                bytes = bytes.concat(DirectoryReader(file.getName()));
            }
        }

    } else if(directory.exists()) {
        bytes.push({
            path: file.toPath().toString(),
            name: directory.getName(),
            bytes: Files.readAllBytes(directory.toPath())
        });
    }

    return bytes;
}

exports['getStorage'] = storage;