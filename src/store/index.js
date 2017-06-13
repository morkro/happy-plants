import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import getters from './getters'
import mutations from './mutations'

import plant from '@/app/plant/store'
import settings from '@/app/settings/store'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    plants: [],
    active: plant.state,
    notification: {
      message: false
    }
  },
  actions: {
    ...actions,
    ...plant.actions,
    ...settings.actions
  },
  getters,
  mutations: {
    ...mutations,
    ...plant.mutations
  }
})
