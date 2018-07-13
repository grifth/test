import Vue from 'vue'
import Router from 'vue-router'
import list from '@/components/list'
import learn from '@/components/learn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: list
    },
    {
      path: '/learn/:ms',
      name: 'test',
      component: learn
    }
  ]
})
