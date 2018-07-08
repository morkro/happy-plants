import { mount, createLocalVue } from '@vue/test-utils'
import VueSVGIcon from 'vue-svgicon'
import FileUpload from '@/components/FileUpload'

const localVue = createLocalVue()
localVue.use(VueSVGIcon)

/**
 * TODO:
 * - Test all event emitter
 * - Test classes on preview
 * - Test fileName
 */

describe('components/FileUpload.vue', () => {
  const options = {
    localVue
  }

  it('is a Vue component', () => {
    const wrapper = mount(FileUpload, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(FileUpload, options)
    expect(wrapper.props().name).toEqual('')
    expect(wrapper.props().accepts).toEqual(['.png', '.jpg', '.jpeg'])
    expect(wrapper.props().disablePreview).toEqual(false)
    expect(wrapper.props().triggerUpload).toEqual(false)
  })

  it(`computed 'acceptedFilePattern' is always a string`, () => {
    const wrapper = mount(FileUpload, Object.assign({}, options, { propsData: {
      accepts: ['.foo', '.bar']
    } }))
    expect(wrapper.props().accepts).toEqual(['.foo', '.bar'])
    expect(wrapper.vm.acceptedFilePattern).toEqual('.foo, .bar')
  })
})
