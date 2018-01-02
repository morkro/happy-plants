import { mount } from 'vue-test-utils'
import Progress from '@/components/Progress'

describe('Progress.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(Progress)
    expect(wrapper.isVueInstance()).to.to.equal(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(Progress)
    expect(wrapper.props().current).to.to.equal(0)
    expect(wrapper.props().steps).to.to.equal(0)
    expect(wrapper.props().showInfo).to.to.equal(true)
  })
})
