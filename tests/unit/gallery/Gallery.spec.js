import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Router from 'vue-router'
import VueTouch from 'vue-touch'
import VueSVGIcon from 'vue-svgicon'
import 'localforage-startswith'

import Gallery from '@/app/gallery/Gallery'
import store from '@/store'
import router from '@/router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)
localVue.use(VueTouch)
localVue.use(VueSVGIcon)

describe('app/gallery/Gallery.vue', () => {
  const options = {
    localVue,
    store,
    router,
    stubs: {
      'a11y-dialog': '<div class="happy-dialog-base" />',
      'feather-left': '<svg />',
      'feather-right': '<svg />',
      'portal-dialog': '<div />'
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(Gallery, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
