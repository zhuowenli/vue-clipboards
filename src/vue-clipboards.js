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

            const { componentOptions, data } = vnode;
            const listeners = componentOptions ? componentOptions.listeners : null;
            const on = data ? data.on : null;
            const events = listeners && listeners || on && on;

            if (events && typeof events === 'object' && Object.keys(events).length) {
                // fixed with Vue 2.2.x, event object `fn` rename to `fns`
                Object.keys(events).map(cb => clipboards.on(cb, events[cb].fn || events[cb].fns));
            }
        },
        unbind () {
            if (clipboards && clipboards.destroy) {
                clipboards.destroy();
            }
        },
        update (container, binding, vnode) {
            binding.def.unbind();
            binding.def.bind(container, binding, vnode);
        }
    });
}
