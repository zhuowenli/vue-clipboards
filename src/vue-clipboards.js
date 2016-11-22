/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : VueClipboard
 */

const Clipboard = require('Clipboard');

if (!Clipboard) {
    throw new Error('[vue-clipboards] cannot locate Clipboard.')
}

export default function (Vue) {
    let clipboards;

    Vue.directive('clipboard', {
        bind(container, binding) {
            const { value } = binding;
            const option = {};

            if (value && typeof value === 'string') {
                option.text = () => value;
            }

            clipboards = new Clipboard(container, option);

            clipboards.on('success', console.log);
            clipboards.on('error', console.log);
        },
        // update(container, binding) {
        //     console.log(container, binding);
        // },
        unbind() {
            clipboards.destroy();
        }
    });
}
