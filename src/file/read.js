importClass(java.io.File);
importPackage(java.nio.file.Files);

function read(path) {
    let file = new File(path);
    if(!file.exists() || !file.isFile()) {
        return {
            result: false,
            reason: "not exists or not file",
            path: path,
            v: () => ""
        };
    }

    let bytes = readAllBytes(file.toPath());
    return {
        result: true,
        reason: "",
        path: path,
        v: () => bytes
    };
}

function readString(path) {
    let value = read(path);
    let string = java.lang.String(value.v(), "UTF-8");
    value.v = () => string;
    return value;
}

module.exports = {
    read: readString,
    rawRead: read,
};