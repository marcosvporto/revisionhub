<template>
  <div id="app">
    <navbar>RevisionHub</navbar>
    <router-view id="router-view"></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

require('../node_modules/@fortawesome/fontawesome-free/css/all.min.css')

export default {
  name: 'App',
  components: {
    'navbar':Navbar
  }
}
</script>

<style>
  /* Stylesheet do projeto */
  @import url(assets/css/main.css);
  /* Fonte Roboto da google */
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  body {
    font-family: Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    margin: 0;
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
  #router-view
  {
    flex: 1 1 auto;
  }
</style>
