/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : index
 */

import VueClipboard from './vue-clipboards';

function plugin (Vue, option = {}) {
    if (plugin.installed) {
        console.warn('[vue-clipboards] already installed.');
    }

    VueClipboard(Vue);
}

if (typeof define === 'function' && define.amd) {
    define([], () => { plugin });
} else if (window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;
