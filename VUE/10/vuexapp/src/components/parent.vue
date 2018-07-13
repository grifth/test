<template>
  <div class="hello">
      <span>我是父组件</span>
      <hr>
      <p>我是父组件中拿到的全局{{getNum}}</p>
      <button @click="padd">父组件 改变状态的按钮</button>
      <button @click="paddaction">父组件 改变状态的按钮(action)</button>
      <son :msg="ms" @handle="get"></son>
  </div>
</template>


<script>
import son from './son.vue'
export default {
  name: 'parent',
  data () {
    return {
      ms: 'Welcome to Your Vue.js App'
    }
  },
  components:{
      son
  },
  methods:{
      get(val){
          this.ms = val 
      },
      padd(){
          this.$store.commit('increase')
      },
      paddaction(){
          this.$store.dispatch('decreaseAction')
      }
  },
    computed:{
      getNum(){
        //   return this.$store.state.num
        return this.$store.getters.getNum
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
