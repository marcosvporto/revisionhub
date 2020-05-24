<template>
    <div id="app" class="flex-column">
        <navbar>RevisionHub</navbar>
        <router-view id="router-view">
        </router-view>
    </div>
</template>

<script>
    import Navbar from './components/Navbar'

    require('../node_modules/@fortawesome/fontawesome-free/css/all.min.css')

    export default {
        name: 'App',
        components: {
            'navbar': Navbar
        }
    }
</script>

<style>
    /* Stylesheet do projeto */
    @import url(assets/css/main.css);
    /* Fonte Roboto da google */
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

    #app {
        height: 100vh;
        width: 100vw;
        min-width: 1000px;
    }

    #router-view {
        flex: 1 1 auto;
        width: 100%;
    }
</style>
