import { shallowMount, createLocalVue } from '@vue/test-utils'
import Tags from '@/app/settings/screens/Tags'
import Button from '@/components/Button'
import Tag from '@/components/Tag'
import store from '@/store'
import router from '@/router'

const localVue = createLocalVue()

describe('app/settings/screens/Tags.vue', () => {
  const options = {
    localVue,
    store,
    router,
    stubs: {
      'v-button': Button,
      'v-tag': Tag,
      'tag-dialog': '<div />',
      'tag-modal': '</div>',
      'tag-item': '<div />',
      'better-dialog': '<div />'
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(Tags, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('shows empty message if no tags are in store', () => {
    const wrapper = shallowMount(Tags, options)
    expect(wrapper.find('.tags-empty').exists()).toBe(true)
    expect(wrapper.find('.tags-list').exists()).toBe(false)
  })
})
