<template>
    <div class="hello">
        <!-- <h2>{{$route.params.worldmsg}}</h2> -->
        <h2>{{$route.query.worldmsg}}</h2>
    </div>
</template>

<script>
export default {
  name: 'hei',
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

