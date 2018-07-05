import router from 'vue-router'
import Vue from 'vue'
import HelloWorld from '../components/HelloWorld'
import hei from '../components/hei'
Vue.use(router)

export default new router({
  routes:[{
    path:'/hello',
    component:HelloWorld
  },{
    path:'/heihei',
    component:hei
  }]
})
/* eslint-disable no-new */
