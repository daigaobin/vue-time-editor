<template>
    <div id="app">
        <img src="./assets/logo.png">
        <TimeEditor v-model="timeEditor" @change="change"></TimeEditor>
    </div>
</template>

<script>

    export default {
        name: 'app',
        components: {
        },
        data() {
            return {
                timeEditor: []
            }
        },
        methods: {
            change(value) {
                console.log(value);
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
