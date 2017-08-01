/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-06-09 14:54:12
 */

export const usageHTML = '<button v-clipboard="copyData">Copy</button>';
export const usageScript = `import VueClipboards from 'vue-clipboards';

Vue.use(VueClipboards);

new Vue({
    data() {
        return {
            copyData: 'copy data'
        }
    }
});`;

export const eventHTML = `<button
    v-clipboard="copyData"
    @success="handleSuccess"
    @error="handleError"
>Copy</button>`;
export const eventScript = `import VueClipboards from 'vue-clipboards';

Vue.use(VueClipboards);

new Vue({
    data() {
        return {
            copyData: 'copy data'
        }
    },
    methods: {
        handleSuccess(e) {
            console.log(e);
        },
        handleError(e) {
            console.log(e);
        },
    }
});`;

export const cutHTML = `<button
    v-clipboard="cutData"
    @success="handleSuccess"
>Copy</button>`;
export const cutScript = `import VueClipboards from 'vue-clipboards';

Vue.use(VueClipboards);

new Vue({
    data() {
        return {
            cutData: 'hello world'
        }
    },
    methods: {
        handleSuccess(e) {
            this.cutData = '';
        }
    }
});`;

export const multipleHTML = `<template v-for="(item, inx) in copyData">
    <button v-clipboard="item" :key="inx">{{item}}</button>
</template>`;
export const multipleScript = `import VueClipboards from 'vue-clipboards';

Vue.use(VueClipboards);

new Vue({
    data() {
        return {
            copyData: ['张三', '李四', '王五']
        }
    }
});`;

export const functionHTML = `<button
    v-clipboard="onCopyAction"
    @success="handleSuccess"
>Copy</button>`;

export const functionScript = `import VueClipboards from 'vue-clipboards';

Vue.use(VueClipboards);

new Vue({
    data() {
        return {
            value: 1
        }
    },
    methods: {
        onCopyAction() {
            return this.value + 1;
        }
    }
});`;
