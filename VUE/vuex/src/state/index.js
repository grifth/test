//创建状态仓库
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export  default new Vuex.Store({
  state:{
    num: 10
  },
  mutations:{
    increase(state){
      state.num++ ;
    },
    decrease(state){
      state.num = state.num - 5;
    }
  },
  actions:{
    icr(context){
      context.commit('increase')
    }
  },
  getters:{
    getNum(state){
      return state.num >0 ? state.num :0;
    }
  }
})
