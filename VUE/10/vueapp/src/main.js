// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import Vue from 'vue'
import rt from './router/index'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router:rt,
  components: { App },
  template: '<App/>'
})