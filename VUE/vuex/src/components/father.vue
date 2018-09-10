<template>
  <div class="hello">
    <p>father{{getNum}}</p><button type="button" name="button" @click="add">+</button>
  </div>
</template>

<script>
export default {
  name: 'father',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    add(){
      this.$store.dispatch('icr')
    }
  },
  computed:{
    getNum(){
      return this.$store.state.num
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
