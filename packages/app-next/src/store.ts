import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { store as user } from '@/modules/user'
import { store as login } from '@/modules/login'
import config from './config'

Vue.use(Vuex)

export interface RootState {
  version: string
}

const store: StoreOptions<RootState> = new Vuex.Store<RootState>({
  strict: !config.isProduction,
  state: {
    version: '2.0.0',
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    login,
  },
})

export default store
