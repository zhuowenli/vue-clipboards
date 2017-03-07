/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */

import Vue from 'vue/dist/vue';
import VueClipboards from '../dist/vue-clipboards';

const log = console.log;
const $logs = document.getElementById('logs');

// 拦截log，在html中输出
console.log = (...args) => {
    log.apply(console, args);

    $logs.innerHTML += `<p>${JSON.stringify(args)}</p>`;
};

Vue.use(VueClipboards);

export default new Vue({
    el: '#app',
    data: {
        value: 'Some message.'
    },
    methods: {
        handleSuccess (e) {
            console.log('handleSuccess:', e);
        },
        handleError (e) {
            console.log('handleError:', e);
        }
    }
});
