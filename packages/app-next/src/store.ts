import Vue from 'vue'
import Vuex from 'vuex'
import { store as login } from '@/modules/login'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    login,
  },
})
