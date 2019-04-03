import { shallowMount, createLocalVue } from '@vue/test-utils'
import SettingsTags from '@/app/settings/components/SettingsTags'
import store from '@/store'
import router from '@/router'

const localVue = createLocalVue()

describe('app/settings/SettingsTags.vue', () => {
  const options = {
    localVue,
    store,
    router,
    stubs: {
      'v-button': '<button />',
      'v-tag': '<span />',
      'tag-dialog': '<div />',
      'tag-modal': '</div>',
      'tag-item': '<div />',
      'portal-dialog': '<div />'
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(SettingsTags, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('shows empty message if no tags are in store', () => {
    const wrapper = shallowMount(SettingsTags, options)
    expect(wrapper.find('.tags-empty').exists()).toBe(true)
    expect(wrapper.find('.tags-list').exists()).toBe(false)
  })
})
