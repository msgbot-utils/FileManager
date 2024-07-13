var ZipFile = Packages.net.lingala.zip4j.core.ZipFile;
var ZipParameters = Packages.net.lingala.zip4j.model.ZipParameters;
var ZipException = Packages.net.lingala.zip4j.exception.ZipException;
var Zip4jConstants = Packages.net.lingala.zip4j.util.Zip4jConstants;
var FilenameUtils = Packages.org.apache.commons.io.FilenameUtils;
var File = Packages.java.io.File;

function unzip(path, toPath, password) {
    if(!File(path).exists() || File(toPath).exists()) {
        return {
            result: false,
            reason: "path is not exists or destination path is already exists",
            path: [path, toPath],
            v: {}
        };
    }
    try{
    var zipFile = new ZipFile(path);
    
    if (zipFile.isEncrypted()) {
        zipFile.setPassword(password);
    }
    
    zipFile.extractAll(toPath);

    return {
        result: true,
        reason: "",
        path: [path, toPath],
        v: {
            zipType: path.split(".").slice(-1).join(""),
            password: password
        }
    };
    }catch (err) {
        return {
            result: false,
            reason: "caught error while extracting",
            path: [path, toPath],
            v: err
        };
    }
};

module.exports = unzip;
