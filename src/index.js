let read = require("./file/read");
let write = require("./file/write");

let utils = {
    archive: require("./file/archive"),
    extract: require("./file/extract"),
    storage: require("./file/storage"),
    download: write.downloadUrl
};

module.exports = {
    utils: utils,
    read: read.read,
    write: write.write,
    rawRead: read.rawRead,
    rawWrite: write.rawWrite,
    delete: require("./file/delete"),
};
