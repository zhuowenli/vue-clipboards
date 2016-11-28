/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : VueClipboard
 */

const Clipboard = require('clipboard');

if (!Clipboard) {
    throw new Error('[vue-clipboards] cannot locate Clipboard.');
}

export default function (Vue) {
    let clipboards;

    Vue.directive('clipboard', {
        bind (container, binding, vnode) {
            const { value } = binding;
            const option = {};

            if (value && typeof value === 'string') {
                option.text = () => value;
            }

            clipboards = new Clipboard(container, option);

            if (vnode.data) {
                const { on } = vnode.data;

                Object.keys(on).map(callback => clipboards.on(callback, on[callback].fn));
            }
        },
        unbind () {
            clipboards.destroy();
        }
    });
}
