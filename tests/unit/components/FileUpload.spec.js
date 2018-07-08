import { mount } from '@vue/test-utils'
import FileUpload from '@/components/FileUpload'

/**
 * TODO:
 * - Test all event emitter
 * - Test classes on preview
 * - Test fileName
 */

describe('components/FileUpload.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(FileUpload)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(FileUpload)
    expect(wrapper.props().name).toEqual('')
    expect(wrapper.props().accepts).toEqual(['.png', '.jpg', '.jpeg'])
    expect(wrapper.props().disablePreview).toEqual(false)
    expect(wrapper.props().triggerUpload).toEqual(false)
  })

  it(`computed 'acceptedFilePattern' is always a string`, () => {
    const wrapper = mount(FileUpload, { propsData: {
      accepts: ['.foo', '.bar']
    } })
    expect(wrapper.props().accepts).toEqual(['.foo', '.bar'])
    expect(wrapper.vm.acceptedFilePattern).toEqual('.foo, .bar')
  })
})
