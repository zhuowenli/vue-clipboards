/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */

import 'highlightjs/highlight.pack.min';
import Vue from 'vue';

import App from './App.vue';
import VueClipboards from '../src/vue-clipboards';

Vue.use(VueClipboards);

export default new Vue({
    el: '#app',
    render: h => h(App)
});
