import { mount } from 'avoriaz'
import Progress from '@/components/Progress'

describe('Progress.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(Progress)
    expect(wrapper.isVueComponent).to.equal(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(Progress, { propsData: {} })
    expect(wrapper.vm.$props.current).to.equal(0)
    expect(wrapper.vm.$props.steps).to.equal(0)
    expect(wrapper.vm.$props.showInfo).to.equal(true)
  })
})
