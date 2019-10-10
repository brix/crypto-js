const path = require('path');
const pkg = require('../package.json');
const resolve = require('rollup-plugin-node-resolve');
// const commonjs = require('rollup-plugin-commonjs');
// const babel = require('rollup-plugin-babel');
// const json = require('rollup-plugin-json');

const banner = `/*
    @license
    crypto-js v${pkg.version}
    (c) 2009-2013 Jeff Most
    (c) 2013-${new Date().getFullYear()} ${pkg.author.name}
    ${pkg.repository.url}
    Released under the MIT License.
*/`;

const uniqResolve = (p) => {
    return path.resolve(__dirname, './', p);
}

module.exports = {
    input: uniqResolve('../src/index.js'),
    output: {
        file: uniqResolve('../lib/index.js'),
        format: 'umd',
        name: 'crypto',
        banner
    }
}