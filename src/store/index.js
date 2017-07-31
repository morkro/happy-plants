import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

import overview from '@/app/overview/store'
import plant from '@/app/plant/store'
import settings from '@/app/settings/store'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    updated: Date.now(),
    plants: [],
    active: plant.state,
    // TODO: move to shared component
    notification: {
      message: false
    },
    // TODO: move to respective components and merge here
    settings: {
      filter: 'latest'
    }
  },
  actions: {
    ...actions,
    ...overview.actions,
    ...plant.actions,
    ...settings.actions
  },
  getters,
  mutations: {
    ...mutations,
    ...overview.mutations,
    ...plant.mutations
  }
})
