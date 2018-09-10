<template>
  <div class="hello">
      <button type="button" name="button" @click="decrease">click</button>
      <p>{{getCount}}</p>
    <father></father>
  </div>
</template>

<script>
import father from './father.vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    add(){
      this.$store.commit('increase')
    },
    decrease(){
      this.$store.commit('decrease')
    }
  },
  computed:{
    getCount(){
      return this.$store.getters.getNum
    }
  },
  components:{
    father,
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
