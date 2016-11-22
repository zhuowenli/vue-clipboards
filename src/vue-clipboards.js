/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : VueClipboard
 */

import Clipboard from 'clipboard';

if (!Clipboard) {
    throw new Error('[vue-clipboards] cannot locate Clipboard.')
}

export default function (Vue) {
    let clipboard;

    Vue.directive('clipboard', {
        bind(container, binding) {
            const { value } = binding;
            const option = {};

            if (value && typeof value === 'string') {
                option.text = () => value;
            }

            clipboard = new Clipboard(container, option);

            clipboard.on('success', console.log);
            clipboard.on('error', console.log);
        },
        // update(container, binding) {
        //     console.log(container, binding);
        // },
        unbind() {
            clipboard.destroy();
        }
    });
}
