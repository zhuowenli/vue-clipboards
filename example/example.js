/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */

const Vue = require('Vue/dist/vue');
const VueClipboards = require('../dist/vue-clipboards');

const log = console.log;
const $logs = document.getElementById('logs');

// 拦截log，在html中输出
console.log = (...args) => {
    log.apply(console, args);

    const _args = args.map(arg => {
        if (typeof arg === 'object' && !arg.childred && !arg.elm) {
            return JSON.stringify ? JSON.stringify(arg) : arg;
        }
        return arg;
    });

    $logs.innerHTML += `<p>${_args.join(' ')}</p>`;
};

Vue.use(VueClipboards);

new Vue({
    el: '#app',
    data: {
        value: 'Some message.'
    },
    methods: {
        handleSuccess(e) {
            console.log('handleSuccess:', e);
        },
        handleError(e) {
            console.log('handleError:', e);
        },
    }
});
