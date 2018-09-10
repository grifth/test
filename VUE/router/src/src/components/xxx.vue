<template>
  <div class="hello">
    <p>{{count}}</p>
    <button type="button" name="button" @click="increment">+++</button>
  </div>
</template>

<script>
export default{
  name:'sildebar',
  data(){
      return{

      }
  },
  methods:{
      increment(){
        this.$store.commit('increment')
      },
      decrement(){
        this.$store.commit('decrement')
      }
  },
  computed:{
      count(){
          return this.$store.state.count
      },
  }


}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
