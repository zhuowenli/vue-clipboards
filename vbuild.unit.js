/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-03-29 17:17:37
 */

const karma = require('vbuild-karma');

module.exports = {
    vendor: false,
    minimize: false,
    sourceMap: false,
    run (webpackConfig) {
        karma(webpackConfig);
    }
};
