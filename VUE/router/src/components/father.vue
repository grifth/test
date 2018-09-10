<template>
  <div class="hello">
      <!-- 向son传递数据 有两种方式 -->
      <!-- <router-link :to="{path:'/son',query:{msg:'爸爸的数据'}}">son</router-link>
      <router-link :to="{ name: 'son', params: {msg:'爸爸的'} }">params</router-link> -->
  </div>
</template>

<script>
import son from './son'
export default {
  name: 'father',
  data () {
    return {
    }
  },
  components:{
    son,
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
