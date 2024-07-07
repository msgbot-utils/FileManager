importPackage(java.io);
importPackage(java.util.zip);
// 세션 챗으로 대화해요 How
/**
 * 
 * @param {string} path - archive path
 * @param {string} toPath - result path
 * @param {string} password - encrypt password , not required
 * @returns {object} - value
 */

function zip(path, toPath, password) {
    let file = new File(path);
    let zipFile = new File(toPath);

    if (!file.exists()) {
        return {
            result: false,
            reason: "not exists",
            path: [file, zipFile],
            v: {},
        };
    }

    try {
        let fos = new FileOutputStream(zipFile);
        let zos = new ZipOutputStream(fos);

        if (password != null && pasword != "") {
            zos.setMethod(ZipOutputStream.DEFLATED);
            zos.setEncryptionMethod(ZipOutputStream.STANDARD_ENCRYPTION);
            zos.setPassword(password.split(""));
        }

        if (file.isDirectory()) {

            if (file.isDirectory()) {
                zipDirectory(file, file.getName(), zos);
            } else if (file.isFile()) {
                zipFile(file, file.getName(), zos);
            }

            zos.close();
            fos.close();

            return {
                result: true,
                reason: "",
                path: [file, zipFile],
                v: {
                    type: file.isFile() ? "file" : "directory",
                    password: password ? password : ""
                }
            };
        }
    } catch (err) {
        return {
            result: false,
            reason: "caught error while archive",
            path: [file, zipFile],
            v: err
        };
    }
}

/**
 * 
 * @param {string} file - file path
 * @param {string} fileName - fileName
 * @param {object} zos - new ZipOutputStream()
 */

function zipFile(file, fileName, zos) {
    var fis = new FileInputStream(file);
    var zipEntry = new ZipEntry(fileName);
    zos.putNextEntry(zipEntry);

    var bytes = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
    var length;
    while ((length = fis.read(bytes)) >= 0) {
        zos.write(bytes, 0, length);
    }

    zos.closeEntry();
    fis.close();
}

/**
 * 
 * @param {string} file - file path
 * @param {string} fileName - fileName
 * @param {object} zos - new ZipOutputStream()
 */

function zipDirectory(file, fileName, zos) {
    var files = file.listFiles();
    if (files != null) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (file.isDirectory()) {
                zipDirectory(file, fileName + File.separator + file.getName(), zos);
            } else {
                zipFile(file, fileName + File.separator + file.getName(), zos);
            }
        }
    }
}

module.exports = zip;