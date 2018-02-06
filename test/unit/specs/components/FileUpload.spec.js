import { mount } from 'vue-test-utils'
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
    expect(wrapper.isVueInstance()).to.equal(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(FileUpload)
    expect(wrapper.props().name).to.equal('')
    expect(wrapper.props().accepts).to.deep.equal(['.png', '.jpg', '.jpeg'])
    expect(wrapper.props().disablePreview).to.equal(false)
  })

  it(`computed 'acceptedFilePattern' is always a string`, () => {
    const wrapper = mount(FileUpload, { propsData: {
      accepts: ['.foo', '.bar']
    } })
    expect(wrapper.props().accepts).to.deep.equal(['.foo', '.bar'])
    expect(wrapper.vm.acceptedFilePattern).to.equal('.foo, .bar')
  })
})
