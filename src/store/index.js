import Vuex from 'vuex'
import Vue from 'vue'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

import overview from '@/app/overview/store'
import plant from '@/app/plant/store'
import settings from '@/app/settings/store'

import pkg from '#/package.json'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    version: pkg.version,
    updated: Date.now(),

    appheader: {
      transparent: false,
      iconColor: 'black',
      title: '',
      backBtn: true,
      backBtnPath: '/',
      settingsBtn: true,
      settingsIcon: 'settings',
      settingsBtnOnClick: () => {}
    },

    notification: {
      message: false
    },

    settings: {
      orderBy: 'latest',
      viewMode: 'grid',
      filterBy: 'all',
      hasNewRelease: false
    },

    plants: false,
    selected: plant.state,
    tags: []
  },

  actions: {
    ...actions,
    ...overview.actions,
    ...plant.actions,
    ...settings.actions
  },

  getters: {
    ...getters
  },

  mutations: {
    ...mutations,
    ...overview.mutations,
    ...plant.mutations,
    ...settings.mutations
  }
})
