/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */

import Vue from 'vue';
import 'sweetalert/dist/sweetalert.css';

import App from './App.vue';
import VueClipboards from '../src/vue-clipboards';

Vue.use(VueClipboards);

export default new Vue({
    el: '#app',
    render: h => h(App)
});
