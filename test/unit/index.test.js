/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-03-29 18:05:12
 */

'use strict';

import Vue from 'vue';
import App from '../../example/App';
import VueClipboards from '../../src/vue-clipboards';

Vue.use(VueClipboards);

describe('App', () => {
    it('has expected content', () => {
        const vm = new Vue(App).$mount();
        expect(vm.$el.textContent.indexOf('Copy') > -1).toBe(true);
    });
});
