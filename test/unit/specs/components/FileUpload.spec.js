import { mount } from 'vue-test-utils'
import FileUpload from '@/components/FileUpload'

describe('FileUpload.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(FileUpload)
    expect(wrapper.isVueInstance()).to.to.equal(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(FileUpload)
    expect(wrapper.props().name).to.to.equal(undefined)
    expect(wrapper.props().accepts).to.deep.to.equal(['.png', '.jpg', '.jpeg'])
    expect(wrapper.props().disablePreview).to.to.equal(false)
  })

  it(`computed 'acceptedFilePattern' is always a string`, () => {
    const wrapper = mount(FileUpload, { propsData: {
      accepts: ['.foo', '.bar']
    } })
    expect(wrapper.props().accepts).to.deep.equal(['.foo', '.bar'])
    expect(wrapper.vm.acceptedFilePattern).to.equal('.foo, .bar')
  })
})
