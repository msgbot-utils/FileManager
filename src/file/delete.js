importClass(java.io.File);


/**
 * @param {string} path - delete Path
 * @returns {boolean} - isDeleted
 */
function deletePath(path) {
    let pathres = File(path);
    if (!pathres.exists()) return false;
    if (pathres.isDirectory()) {
        pathres.listFiles().map(dir => delete (dir));
    } else {
        pathres.delete();
    }
    return true;
}

module.exports = deletePath;