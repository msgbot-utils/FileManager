var ZipFile = Packages.net.lingala.zip4j.core.ZipFile;
var ZipParameters = Packages.net.lingala.zip4j.model.ZipParameters;
var ZipException = Packages.net.lingala.zip4j.exception.ZipException;
var Zip4jConstants = Packages.net.lingala.zip4j.util.Zip4jConstants;
var FilenameUtils = Packages.org.apache.commons.io.FilenameUtils;
var File = Packages.java.io.File;

function zip(path, toPath, password) {
    if(!File(path).exists() || File(toPath).exists()) {
        return {
            result: false,
            reason: "path is not exists or destination path is already exists",
            path: [path, toPath],
            v: {}
        };
    }
    try{
    var zipParameters = new ZipParameters();
    zipParameters.setCompressionMethod(Zip4jConstants.COMP_DEFLATE);
    zipParameters.setCompressionLevel(Zip4jConstants.DEFLATE_LEVEL_ULTRA);
    zipParameters.setEncryptFiles(password ? !0 : !1);
    zipParameters.setEncryptionMethod(Zip4jConstants.ENC_METHOD_AES);
    zipParameters.setAesKeyStrength(Zip4jConstants.AES_STRENGTH_256);
    if(password) zipParameters.setPassword(password);
    
    var finalPath = toPath.split("/").slice(-1).includes(".") ? toPath : toPath + "zip";
    var zipFile = new ZipFile(finalPath);
    
    zipFile.addFile(new File(path), zipParameters);

    return {
        result: true,
        reason: "",
        path: [path, toPath],
        v: {
            fileType: File(path).isFile() ? "file" : "directory",
            zipType: finalPath.split(".").slice(-1).join(""),
            password: password
        }
    };
    }catch (err) {
        return {
            result: false,
            reason: "caught error while archiving",
            path: [path, toPath],
            v: err
        };
    }
};

module.exports = zip;
