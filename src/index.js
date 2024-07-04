let storage = require("./storage");

function setFile /** @constructor */ (path) {
    this.filePath = path;
}

setFile.toString = (() => "new <requireName> (string: filePath)").bind({});

module.exports = setFile;