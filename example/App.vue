<template>
    <div id="app">
        <div class="input-group">
            <input class="input-group__inner" type="text" v-model="value">
            <button
                class="input-group__append"
                v-clipboard="value"
                :key="1"
                @success="handleSuccess"
                @error="handleError"
            >Copy</button>
        </div>
        <div class="input-group">
            <input class="input-group__inner" type="text" v-model="value2">
            <button
                class="input-group__append"
                v-clipboard="value2"
                :key="2"
                @success="handleSuccess"
                @error="handleError"
            >Copy</button>
        </div>
    </div>
</template>

<script>
    import swal from 'sweetalert';

    export default {
        name: 'App',
        data () {
            return {
                value: 'Hello world!',
                value2: 'kek'
            };
        },
        methods: {
            handleSuccess (e) {
                swal(e.text, 'good job, you got it!', 'success');
            },
            handleError () {
                swal('Oops...', 'Something went wrong!', 'error');
            }
        }
    };
</script>

<style lang="sass">
.input-group
    display: -webkit-flex;
    display: flex;
    width: 100%;
    max-width: 450px;
    margin-bottom: 10px
    &__inner
        -webkit-flex: 1;
        flex: 1;
        padding: 7px 8px;
        border: 1px solid #ccc;
        border-right: 0
        background: #fff;
        font-size: 13px;
        line-height: 13px;
        outline: 0;
    &__append
        display: inline-block;
        border: 1px solid #ccc;
        background-color: #eee;
        background-image: linear-gradient(#fcfcfc, #eee);
</style>
