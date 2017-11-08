import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

import overview from '@/app/overview/store'
import categories from '@/app/categories/store'
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
    // TODO: move to respective components and merge here
    settings: {
      filter: 'latest'
    },
    categories: []
  },

  actions: {
    ...actions,
    ...overview.actions,
    ...categories.actions,
    ...plant.actions,
    ...settings.actions
  },

  getters,

  mutations: {
    ...mutations,
    ...overview.mutations,
    ...categories.mutations,
    ...plant.mutations,
    ...settings.mutations
  }
})
