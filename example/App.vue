<template lang="pug">
    #app
        header.header.gradient.text-center
            h1.title vue-clipboards
            h2.subtitle Vue2.0 directive to copy text to clipboard.
            p.gh-btns
                iframe(src="https://ghbtns.com/github-btn.html?user=zhuowenli&repo=vue-clipboards&type=star&count=true&size=large" allowtransparency="true" frameborder="0" scrolling="0" width="152" height="30")
                iframe(src="https://ghbtns.com/github-btn.html?user=zhuowenli&repo=vue-clipboards&type=fork&count=true&size=large" allowtransparency="true" frameborder="0" scrolling="0" width="152" height="30")

        main.wrap
            h1 vue-clipboards
            p 📋 Vue2.0 directive to copy or cut text to clipboard.
            p
                | Vue wrapper for&nbsp;
                a(href="https://github.com/zenorocha/clipboard.js" target="_blank") clipboard
                | .

            h1#install Install
            p You can get it on npm.
            pre.snippet
                button.btn(v-clipboard="install" key="install" @success="handleSuccess")
                code {{install}}

            h1#usage Usage
            h3 Copy text
            p A pretty common use case is to copy content from another element. You can do that by adding a
                code v-clipboard
                | attribute in your trigger element.
            .example
                .input-group
                    input(type="text" v-model="copyData")
                    button.input-group-button(v-clipboard="copyData" key="copyData")
            pre.snippet
                button.btn(v-clipboard="usageHTML" key="usageHTML" @success="handleSuccess")
                code {{usageHTML}}
            pre.snippet
                button.btn(v-clipboard="usageScript" key="usageScript" @success="handleSuccess")
                code {{usageScript}}

            h1#event Event
            p There are cases where you'd like to show some user feedback or capture what has been selected after a copy operation.
            p That's why we fire custom events such as success and error for you to listen and implement your custom logic.
            pre.snippet
                button.btn(v-clipboard="eventHTML" key="eventHTML" @success="handleSuccess")
                code {{eventHTML}}
            p script:
            pre.snippet
                button.btn(v-clipboard="eventScript" key="eventScript" @success="handleSuccess")
                code {{eventScript}}

            h3 Cut text
            p Additionally, you can define a
                code @success
                | callback attribute to specify if you want to either or cut content.
            .example
                .input-group
                    input(type="text" v-model="cutData")
                    button.input-group-button(v-clipboard="cutData" key="cutData" @success="handleCutSuccess")
            pre.snippet
                button.btn(v-clipboard="cutHTML" key="cutHTML" @success="handleSuccess")
                code {{cutHTML}}
            p script:
            pre.snippet
                button.btn(v-clipboard="cutScript" key="cutScript" @success="handleSuccess")
                code {{cutScript}}

            h1#multiple Multiple
            p You need to bind an `key`, when you use 'vue-clipboards' multiple times.
            pre.snippet
                button.btn(v-clipboard="multipleHTML" key="multipleHTML" @success="handleSuccess")
                code {{multipleHTML}}
            p script:
            pre.snippet
                button.btn(v-clipboard="multipleScript" key="multipleScript" @success="handleSuccess")
                code {{multipleScript}}

</template>

<script>
import swal from 'sweetalert';
import { usageScript, usageHTML, eventHTML, eventScript, cutHTML, cutScript, multipleHTML, multipleScript } from './code';

export default {
    name: 'App',
    data () {
        return {
            install: 'npm install vue-clipboards --save',
            usageScript,
            usageHTML,
            eventHTML,
            eventScript,
            cutHTML,
            cutScript,
            multipleHTML,
            multipleScript,
            cutData: 'hello world',
            copyData: 'https://github.com/zhuowenli/vue-clipboards/'
        };
    },
    methods: {
        handleSuccess (e) {
            swal('Success', '', 'success');
        },
        handleCutSuccess (e) {
            this.cutData = '';
        },
        handleError () {
            swal('Oops...', 'Something went wrong!', 'error');
        }
    }
};
</script>

<style lang="sass">
    @import "~primer-css/build/build.css"
    @import "~sweetalert/dist/sweetalert.css"
    @import "./main.sass"
</style>
