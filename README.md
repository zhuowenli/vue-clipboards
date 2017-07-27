# vue-clipboard

[![Build Status](https://travis-ci.org/zhuowenli/vue-clipboards.svg?branch=master)](https://travis-ci.org/zhuowenli/vue-clipboards)

📋 Vue2.0 directive to copy or cut text to clipboard.

Vue wrapper for [clipboard.js](https://github.com/zenorocha/clipboard.js).

DEMO: [https://zhuowenli.github.io/vue-clipboards/](https://zhuowenli.github.io/vue-clipboards/)

## Install

```
$ npm install vue-clipboards
```

## Usage

```js
import VueClipboards from 'vue-clipboards';

Vue.use(VueClipboards);

new Vue({
    data() {
        return {
            copyData: 'copy data'
        }
    }
});
```

```html
<button v-clipboard="copyData">Copy</button>
```

## Event

```html
<button v-clipboard="copyData" @success="handleSuccess" @error="handleError">Copy</button>
```

```js
import VueClipboards from 'vue-clipboards';

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
});
```

## Multiple

You need to bind an `key`, when you use 'vue-clipboards' multiple times.


```html
<template v-for="(item, inx) in copyData">
    <button v-clipboard="item" :key="inx">{{item}}</button>
</template>
```

```js
import VueClipboards from 'vue-clipboards';

Vue.use(VueClipboards);

new Vue({
    data() {
        return {
            copyData: ['张三', '李四', '王五']
        }
    }
});
```


## Development

- `yarn dev`: Run example in development mode
- `yarn deploy`: Deploy example to gh-pages
- `yarn build:cjs`: Build component in commonjs format
- `yarn build:umd`: Build component in umd format
- `yarn build`: Build component in both format
- `yarn lint`: Run eslint
- `yarn test:unit`: Run unit tests using [vbuild-karma](https://github.com/egoist/vbuild-karma)

Check out your npm scripts, it's using [vbuild](https://github.com/egoist/vbuild) under the hood.

---

Generated by [create-vue-app](https://github.com/egoist/create-vue-app)
