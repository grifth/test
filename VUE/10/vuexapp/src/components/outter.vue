<template>
  <div class="hello">
      <button @click="oadd">outter组件 改变状态的按钮</button>
      <button @click="oaddaction">outter组件 改变状态的按钮(action)</button>
      我是outter的{{getNum}}
  </div>
</template>

<script>
export default {
  name: 'outter',
  data(){
      return  {
          toFatherMessage:'我是子组件过来的'
      }
  },
  methods:{
      send(){
          this.$emit('handle',this.toFatherMessage)
      },
      oadd(){
          this.$store.commit('increase')
      },
      oaddaction(){
          this.$store.dispatch('decreaseAction')
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

</style>
