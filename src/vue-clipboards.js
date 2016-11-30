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

            const { listeners } = vnode.componentOptions;
            const { on } = vnode.data;
            const events = listeners ? listeners : on ? on : null;

            if (events && typeof events === 'object' && Object.keys(events).length) {
                Object.keys(events).map(cb => clipboards.on(cb, events[cb].fn));
            }
        },
        unbind () {
            clipboards.destroy();
        }
    });
}
