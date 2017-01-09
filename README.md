# vue-clipboard

[![Build Status](https://travis-ci.org/zhuowenli/vue-clipboards.svg?branch=master)](https://travis-ci.org/zhuowenli/vue-clipboards)

📋 Vue2.0 directive to copy or cut text to clipboard.

Vue wrapper for [clipboard](https://github.com/zenorocha/clipboard.js).

## Install

```
$ npm install vue-clipboards
```

## Usage

```js
const VueClipboards = require('vue-clipboards');

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
const VueClipboards = require('vue-clipboards');

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

