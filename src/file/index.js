let utils = {
    archive: require("./archive"),
    extract: require("./extract"),
    storage: require("./storage"),
};

module.exports = {
    utils: utils,
    read: require("./read"),
    write: require("./write"),
    delete: require("./delete"),
};