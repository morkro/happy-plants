import { shallowMount, createLocalVue } from '@vue/test-utils'
import GalleryOptions from '@/app/gallery/components/GalleryOptions'
import Button from '@/components/Button'

const localVue = createLocalVue()

describe('app/gallery/GalleryOptions.vue', () => {
  const options = {
    localVue,
    stubs: {
      'feather-trash': '<svg />',
      'v-button': Button
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(GalleryOptions, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(GalleryOptions, options)
    expect(wrapper.props().current).toEqual(0)
    expect(wrapper.props().total).toEqual(0)
  })

  it(`emit 'delete-photo' works`, () => {
    const wrapper = shallowMount(GalleryOptions, options)
    const button = wrapper.find(Button)
    button.trigger('click')
    expect(wrapper.emitted('delete-photo')).toBeTruthy()
  })
})
