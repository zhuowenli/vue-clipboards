/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : build
 */

process.env.BABEL_ENV = 'production';

const fs = require('fs');
const rollup = require('rollup');
const uglify = require('uglify-js');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const { version } = require('./package.json');

const banner =`/*!
 * vue-clipboard v${version}
 * (c) ${new Date().getFullYear()} zhuowenli
 * Released under the MIT License.
 */`;

rollup.rollup({
        entry: 'src/index.js',
        plugins: [
            nodeResolve(),
            commonjs(),
            babel()
        ]
    })
    .then((bundle) => {
        const { code } = bundle.generate({
            format: 'umd',
            banner: banner,
            moduleName: 'vueClipboard'
        });

        return write('dist/vue-clipboard.js', code).then(() => code);
    })
    .then((code) => {
        const minified = banner + '\n' + uglify.minify(code, {
            fromString: true,
            output: {
                ascii_only: true
            }
        }).code;

        return write('dist/vue-clipboard.min.js', minified)
    })
    .catch(logError);

function write(dest, code) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dest, code, (err) => {
            if (err) return reject(err);

            console.log(blue(dest) + ' ' + getSize(code));

            resolve();
        });
    });
}

function getSize(code) {
    return `${(code.length / 1024).toFixed(2)}kb`;
}

function logError(e) {
    console.log(e);
}

function blue(str) {
    return `\x1b[1m\x1b[34m${str}\x1b[39m\x1b[22m`;
}