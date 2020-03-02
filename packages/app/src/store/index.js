import Vuex from 'vuex'
import Vue from 'vue'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

import { store as overview } from '@/app/overview'
import { store as plant } from '@/app/plant'
import { store as gallery } from '@/app/gallery'
import { store as settings } from '@/app/settings'

import pkg from '#/package.json'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    version: pkg.version,
    updated: Date.now(),

    hasNewRelease: false,

    appheader: {
      backBtn: true,
      backBtnPath: '/',
      iconColor: undefined,
      rightBtn: true,
      rightBtnOnClick: () => {},
      title: '',
      transparent: false
    },

    notification: {
      message: false
    },

    settings: {
      ...overview.state,
      hasNewRelease: false,
      theme: 'light'
    },

    storage: {
      migrationMode: false,
      type: 'local'
    },

    user: {
      authenticated: false,
      authFromRedirect: false,
      error: false,
      firstTimeUser: false,
      id: null,
      loading: false,
      name: null
    },

    plants: plant.state,
    tags: settings.state.tags,
    gallery: gallery.state
  },

  actions: {
    ...actions,
    ...overview.actions,
    ...plant.actions,
    ...gallery.actions,
    ...settings.actions
  },

  getters: {
    ...getters,
    ...settings.getters
  },

  mutations: {
    ...mutations,
    ...overview.mutations,
    ...plant.mutations,
    ...gallery.mutations,
    ...settings.mutations
  }
})

export default store
