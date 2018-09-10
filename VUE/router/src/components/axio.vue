<template>
  <div class="hello">
    <button @click="get">axios</button>
    <ul v-for="item in items">
      <li>{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
Vue.prototype.$http = axios;
import axios from 'axios'
import Vue from 'vue'

export default {
  name: 'axio',
  data () {
    return {
      items:[]
    }
  },
  methods:{
    get(){
        this.$http.get('https://cnodejs.org/api/v1/topics')
          .then(res=>{
            this.items = res.data.data
            console.log(this.items);
          })
        }
  },
  mounted(){
    this.$http.get('https://cnodejs.org/api/v1/topics')
      .then(res=>{
        this.items = res.data.data
        console.log(this.items);
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
