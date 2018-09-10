import Vue from 'vue'
import Router from 'vue-router'
import father from '@/components/father'
import son from '@/components/son'
import axio from '@/components/axio'

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
      path: '/axio',
      name: 'axio',
      component: axio
    },
  ]
})
