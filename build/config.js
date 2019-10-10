const path = require('path');

module.exports = {
    build: {
        index: path.resolve(__dirname, '../lib/index.js'),
        assetsRootPath: path.resolve(__dirname, '../lib'),
        assetsPublicPath: './'
    }
}