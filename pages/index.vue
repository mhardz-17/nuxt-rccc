<template>
    <div id="app">
        <!--<router-view/>-->
        <resistor-color-code-calculator></resistor-color-code-calculator>
    </div>
</template>

<script>
    import ResistorColorCodeCalculator from '~/components/ResistorColorCodeCalculator.vue'
    // import ResistorColorCodeCalculator from "../components/ResistorColorCodeCalculator";
    export default {
        name: 'App',
        components: {ResistorColorCodeCalculator}
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #5affe7;
        margin-top: 60px;
    }
</style>



