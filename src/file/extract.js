importPackage(java.io);
importPackage(java.util.zip);

/**
 * 
 * @param {string} zipFile - zip file path
 * @param {string} toPath - extracted zip file path
 * @param {string?} password - decrypt key, optional
 * @returns {object} - value
 */

function unzip(zipFile, toPath, password) {
    if (!new File(zipFile).exists() || new File(zipFile).isDirectory() || !toPath) {
        return {
            result: false,
            reason: "not exists or directory or not toPath",
            path: [zipFile, toPath],
            v: {},
        };
    }

    try {
        var file = new File(toPath);
        if (!file.exists()) {
            (new File(toPath.split("/").slice(0, -1).join("/") || toPath)).mkdirs();
        }

        var zipFileObj;
        if (password) {
            zipFileObj = new ZipFile(zipFile);
        } else {
            zipFileObj = new ZipFile(zipFile, password.split(""));
        }

        var entries = zipFileObj.entries();
        
        while (entries.hasMoreElements()) {
            var entry = entries.nextElement();
            var path = toPath + File.separator + entry.getName();

            if (!entry.isDirectory()) {
                extractFile(zipFileObj, entry, path);
            } else {
                var dir = new File(path);
                dir.mkdirs();
            }
        }

        zipFileObj.close();

        return {
            result: true,
            reason: "",
            path: [zipFile, toPath],
            v: {
                zipType: new File(zipFile).getName().split(".").slice(-1).join("")
            }
        };
    } catch (err) {
        return {
            result: false,
            reason: "caught error while extracting",
            path: [zipFile, toPath],
            v: err
        };
    }
}

/**
 * 
 * @param {object} zipFileObj - zipFileObject
 * @param {*} entry - entry
 * @param {string} filePath - file path
 */

function extractFile(zipFileObj, entry, filePath) {
    var bos = new BufferedOutputStream(new FileOutputStream(filePath));
    var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
    var zipStream = zipFileObj.getInputStream(entry);
    var len;
    while ((len = zipStream.read(buffer)) > 0) {
        bos.write(buffer, 0, len);
    }
    bos.close();
    zipStream.close();
}

module.exports = unzip;
