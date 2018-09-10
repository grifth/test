<template>
  <div class="hello">
    <p>father</p>
     <router-link :to="{ name: 'son', params: {msg:'来自father'} }">params</router-link>
     <router-link :to="{ name: 'son', query: {mess:'query里面的'} }">query</router-link>
     <br>
   <so :msg="son" @save="handle"></so>
     <button type="button" name="button" @click="getData">click</button>
     <ul v-for="item in items">
       <li>{{item.title}}</li>
     </ul>
  </div>
</template>

<script>
Vue.prototype.$http = axios;
import axios from 'axios'
import Vue from 'vue'
import so from './son'
export default {
  name: 'father',
  data () {
    return {
      items:[],
      son:'爸爸给的'
    }
  },
  methods:{
    getData(){
        this.$http.get('https://cnodejs.org/api/v1/topics')
          .then(res=>{
            this.items = res.data.data;
            console.log(this.items);
          })
          .catch((err)=>{
            console.log(err);
          })
    },
    handle(val){
      console.log(val);
    }
  },
  components:{
    so
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
