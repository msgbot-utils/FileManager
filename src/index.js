let utils = {
    archive: require("./file/archive"),
    extract: require("./file/extract"),
    storage: require("./file/storage"),
};

module.exports = {
    utils: utils,
    read: require("./file/read"),
    write: require("./file/write"),
    delete: require("./file/delete"),
};