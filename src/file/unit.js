let units = ["B", "KB", "MB", "GB", "TB"];

module.exports = (
    /**
     * 
     * @param {number} bytes - bytes length
     * @returns {object} - value, unit
     */
    function getStorage(bytes) {
        let byte = bytes;
        let unit = 0;
        while (1024 <= bytes) {
            bytes /= 1024, unit++;
        }
        return {
            bytes: byte,
            value: bytes,
            unit: units[unit]
        };
    }).bind({});