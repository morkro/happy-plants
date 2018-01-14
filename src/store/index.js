import Vuex from 'vuex'
import Vue from 'vue'
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
    user: {
      authenticated: false,
      email: null,
      name: null,
      avatar: null
    },
    updated: Date.now(),
    plants: [],
    selected: plant.state,
    notification: {
      message: false
    },
    settings: {
      viewMode: 'grid',
      orderBy: 'latest'
    },
    categories: []
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
    ...plant.mutations,
    ...settings.mutations
  }
})
