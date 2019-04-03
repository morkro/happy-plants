import { shallowMount, createLocalVue } from '@vue/test-utils'
import GalleryUpload from '@/app/gallery/components/GalleryUpload'
import Button from '@/components/Button'

const localVue = createLocalVue()

describe('app/gallery/GalleryOptions.vue', () => {
  const options = {
    localVue,
    stubs: {
      'feather-plus': '<svg />',
      'feather-image': '<svg />',
      'feather-trash': '<svg />',
      'v-button': Button,
      'file-upload': '<div />'
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(GalleryUpload, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = shallowMount(GalleryUpload, options)
    expect(wrapper.props().editMode).toEqual(false)
    expect(wrapper.props().loading).toEqual(false)
  })

  it(`emit 'trigger-{selection|delete}' works`, () => {
    const wrapper = shallowMount(GalleryUpload, options)
    const button = wrapper.find(Button)
    button.trigger('click')
    expect(wrapper.emitted('trigger-selection')).toBeTruthy()
    wrapper.setProps({ editMode: true })
    button.trigger('click')
    expect(wrapper.emitted('trigger-delete')).toBeTruthy()
  })
})
