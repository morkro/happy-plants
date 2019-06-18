import { shallowMount, createLocalVue } from '@vue/test-utils'
import Data from '@/app/settings/screens/Data'
import Button from '@/components/Button'
import store from '@/store'
import router from '@/router'

const localVue = createLocalVue()

describe('app/settings/screens/Data.vue', () => {
  const options = {
    localVue,
    store,
    router,
    stubs: {
      'v-button': Button,
      'better-dialog': '<div />',
      'file-upload': '<div />'
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(Data, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
