import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueSVGIcon from 'vue-svgicon'
import Settings from '@/app/settings/Settings'
import store from '@/store'
import router from '@/router'

const localVue = createLocalVue()
localVue.use(VueSVGIcon)

describe('app/settings/Settings.vue', () => {
  const options = {
    localVue,
    store,
    router,
    stubs: {
      'a11y-dialog': '<div />',
      'feather-x': '<svg />'
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(Settings, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
