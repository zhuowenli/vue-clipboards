/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-03-29 17:17:00
 */

module.exports = options => ({
    entry: 'example/index.js',
    dist: 'dist-example',
    html: {
        title: 'vue-clipboards'
    },
    copy: true,
    webpack (cfg) {
        if (!options.dev) {
            cfg.output.publicPath = './';
        }

        return cfg;
    }
});
