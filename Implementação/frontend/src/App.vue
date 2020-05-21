<template>
  <div id="app">
    <navbar>RevisionHub</navbar>
    <router-view id="router-view"></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: {
    'navbar':Navbar
  }
}
</script>

<style>
  @import url(assets/css/main.css);
  body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    margin: 0px;
    background-color: var(--dark);
    min-width: 500px;
  }
  #app
  {
    display:flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
  }
  navbar
  {
    flex: 0 0 auto;
  }
  #router-view
  {
    flex: 1 1 auto;
  }
</style>
