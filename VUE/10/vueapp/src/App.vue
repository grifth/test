<template>
  <div id="app">
       <list/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import list from './components/list'
export default {
  name: 'App',
  components: {
    HelloWorld,
    list
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
