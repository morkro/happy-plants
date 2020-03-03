import { shallowMount, createLocalVue } from '@vue/test-utils'
import { DownloadIcon, DeleteIcon, CopyIcon } from 'vue-feather-icons'
import Box from '@happy-plants/shared/components/Box.vue'
import SettingsData from '@/app/settings/screens/SettingsData'
import Button from '@/components/Button'
import store from '@/store'
import router from '@/router'

const localVue = createLocalVue()

describe('app/settings/SettingsData.vue', () => {
  const options = {
    localVue,
    store,
    router,
    stubs: {
      'v-button': Button,
      'v-box': Box,
      'better-dialog': '<div />',
      'file-upload': '<div />',
      'feather-download': DownloadIcon,
      'feather-delete': DeleteIcon,
      'feather-copy': CopyIcon
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(SettingsData, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
