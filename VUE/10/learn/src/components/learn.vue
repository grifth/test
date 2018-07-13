<template>
  <div class="hello">
      <h2>{{msg}}</h2>
      <h3>{{$route.params.ms}}</h3>
      <h4>{{$route.query.ms}}</h4>
  </div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
