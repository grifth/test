import Vue from 'vue'
import Router from 'vue-router'
import father from '@/components/father'
import son from '@/components/son'
import xxx from '@/components/xxx'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'father',
      component: father
    },
    {
      path: '/son',
      name: 'son',
      component: son
    },
    {
      path:'/xxx',
      name:'xxx',
      component:xxx
    }
  ]
})
