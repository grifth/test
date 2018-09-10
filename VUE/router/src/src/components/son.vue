<template>
  <div class="hello">
      <p >{{msg}}</p>
      <button type="button" name="button" @click="increase">save</button>
      <p>{{$route.params.msg}}</p>
      <p>{{$route.query.mess}}</p>
  </div>
</template>

<script>
import father from './father'
export default {
  name: 'son',
  props:{
    msg:{
      type:String,
      default:''
    }
  },
  data () {
    return {
      tofathermsg:'0'
    }
  },
  methods:{
    increase(){
      this.tofathermsg++;
      this.$emit('save',this.tofathermsg)
    }
  },
  components:{
    parent
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
