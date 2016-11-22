# vue-clipboard
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
