<template>
    <div id="app">
        <input type="text" v-model="value">
        <button v-clipboard="value" @success="handleSuccess" @error="handleError">Copy</button>
    </div>
</template>

<script>
    import swal from 'sweetalert';

    export default {
        name: 'App',
        data () {
            return {
                value: 'Hello world!'
            }
        },
        methods: {
            handleSuccess(e) {
                swal(e.text, 'good job, you got it!', 'success');
            },
            handleError(e) {
                swal('Oops...', 'Something went wrong!', 'error');
            },
        }
    };
</script>

<style>
#app{
    display: -webkit-flex;
    display: flex;
    width: 100%;
    max-width: 450px;
}
#app input{
    -webkit-flex: 1;
    flex: 1;
    padding: 7px 8px;
    border: 1px solid #ccc;
    background: #fff;
    font-size: 13px;
    line-height: 13px;
    outline: 0;
}
#app button{
    display: inline-block;
    border: 1px solid #ccc;
    border-left: 0;
    background-color: #eee;
    background-image: linear-gradient(#fcfcfc, #eee);
}
</style>
