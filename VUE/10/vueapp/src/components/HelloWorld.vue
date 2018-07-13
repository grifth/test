<template>
  <div class="hello">
    <!-- <h2>{{$route.params.earthmsg}}</h2> -->
    <!-- <h2>{{$route.query.earthmsg}}</h2> -->
    <h3>我是axios</h3>
    <button @click="getData">click</button>
        <button @click="postData">postData</button>

    <ul>
      <li v-for="item in items">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
Vue.prototype.$http = axios
import axios from 'axios'
import Vue from 'vue'
import qs from 'qs'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items:[]
    }
  },
  methods:{
    getData(){
      var self = this
      this.$http.get('https://cnodejs.org/api/v1/topics',{
        params:{
          page:2,
          limit:10
        }
      })
          .then(function(res){
            self.items = res.data.data
            console.log(self.items)
          })
          .catch(function(err){
            console.log(err)
          })
    },
    postData(){
      var self = this
      this.$http.post(url,qs.stringify({
          page:1,
          limit:10
      }))
          .then(function(res){
            self.items = res.data.data
            console.log(self.items)
          })
          .catch(function(err){
            console.log(err)
          })
    }    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
