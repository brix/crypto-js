const chalk = require('chalk');
const ora = require('ora');
const path = require('path');
const fs = require('fs');
const rollup = require('rollup');
const zlib = require('zlib');
const terser = require('terser');
const config = require('./config');
const rollupConfig = require('./rollup.config');

const spinner = ora('building for crypto-js...\n');
spinner.start()

if (!fs.existsSync(config.build.assetsRootPath)) {
    fs.mkdirSync(config.build.assetsRootPath);
}

build(rollupConfig);

function build(config) {
    buildEntry(config).then(() => {
        console.log(chalk.cyan('Build Complete.\n'));
        spinner.stop();
        process.exit(0);
    }).catch((err) => {
        console.log(chalk.yellow('build failed with errors.\n'));
        spinner.stop();
        process.exit(1);
    })
}

function buildEntry(config) {
    const output = config.output;
    const file = output.file;
    const isProd = /(min)\.js$/.test(file);
    return rollup.rollup(config)
        .then((bundle) => {
            return bundle.generate(output);
        })
        .then(({
            output: [{
                code
            }]
        }) => {
            if (isProd) {
                const options = {
                    toplevel: 'true',
                }
                const miniCode = terser.minify(code, options).code;
                return writeFile(file, miniCode, isProd);
            } else {
                return writeFile(file, code);
            }
        })
}

function writeFile(dest, code, isMin) {
    return new Promise((resolve, reject) => {
        function exportInfo(info = '') {
            console.log(`${chalk.cyan(path.relative(process.cwd(), dest))} ${getFileSize(code)}${info}`);
            resolve();
        }
        fs.writeFile(dest, code, (err) => {
            if (err) throw err;
            if (isMin) {
                zlib.gzip(code, (err, zipped) => {
                    if (err) {
                        return reject(err);
                    };
                    exportInfo(` (gzipped ${getFileSize(zipped)})`);
                })
            } else {
                exportInfo();
            }
        })
    })
}

function getFileSize(code) {
    return `${(code.length / 1024).toFixed(2)}kb`;
}