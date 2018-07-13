<template>
  <div class="hello">
    <ul>
      <router-link to="/"><li>首页</li></router-link>
      <router-link :to="{name:'test',params:{ms:123}}"><li>新手入门</li></router-link>
      <router-link to="/learn"><li>api</li></router-link>
      <router-link to="/"><li>关于</li></router-link>
      <router-link to="/"><li>登录</li></router-link>
      <router-link to="/"><li>注册</li></router-link>
    </ul>
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
*{
  padding: 0;
  margin: 0;
}
.hello{
  background: #5a5555;
  height: 50px;
}
ul{
    list-style:none;
    float: right;
    margin:5px;
}
li{
  display: inline-block;
  padding: 10px 15px;
  color:black;
}
</style>
