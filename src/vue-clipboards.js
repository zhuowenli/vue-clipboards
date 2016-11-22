/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : VueClipboard
 */

const Clipboard = require('Clipboard');

if (!Clipboard) {
    throw new Error('[vue-clipboards] cannot locate Clipboard.');
}

export default function (Vue) {
    let clipboards;

    Vue.directive('clipboard', {
        bind (container, binding, vnode) {
            const { value } = binding;
            const { listeners } = vnode.componentOptions;
            const option = {};

            if (value && typeof value === 'string') {
                option.text = () => value;
            }

            clipboards = new Clipboard(container, option);

            if (listeners) {
                Object.keys(listeners).map(callback => clipboards.on(callback, listeners[callback].fn));
            }
        },
        // update (container, binding) {
        //     console.log(container, binding);
        // },
        unbind () {
            clipboards.destroy();
        }
    });
}
