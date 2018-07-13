<template>
  <div class="hello">
      <span>我是子组件</span>
      <p>{{msg}}</p>
      <button @click="send">Click</button>
      <p>我是子组件全局的:{{getNum}}</p>
      <button @click="sadd">子组件 改变状态的按钮</button>
      <button @click="saddaction">子组件 改变状态的按钮(action)</button>

  </div>
</template>

<script>
export default {
  name: 'son',
  props:{
        msg:{
            type:String,
            default:''
        }  
  },
  data(){
      return  {
          toFatherMessage:'我是子组件过来的'
      }
  },
  methods:{
      send(){
          this.$emit('handle',this.toFatherMessage)
      },
      sadd(){
          this.$store.commit('increase')
      },
      
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

</style>
