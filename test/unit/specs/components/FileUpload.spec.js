import { mount } from 'avoriaz'
import FileUpload from '@/components/FileUpload'

describe('FileUpload.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(FileUpload)
    expect(wrapper.isVueComponent).to.equal(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(FileUpload, { propsData: {} })
    expect(wrapper.vm.$props.name).to.equal(undefined)
  })
})
