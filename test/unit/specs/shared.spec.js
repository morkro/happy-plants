import { mount, shallow } from 'avoriaz'
import AppHeader from '@/app/shared/AppHeader'

describe('AppHeader.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.isVueComponent).to.equal(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(AppHeader, { propsData: {} })
    expect(wrapper.vm.$props.backPath).to.equal('/')
    expect(wrapper.vm.$props.back).to.equal(false)
    expect(wrapper.vm.$props.settings).to.equal(false)
    expect(wrapper.vm.$props.color).to.equal('black')
  })

  it('isWhite() works as expected', () => {
    const wrapper = mount(AppHeader)
    expect(typeof wrapper.vm.isWhite).to.equal('function')
    expect(wrapper.vm.isWhite('foo')).to.equal(false)
    expect(wrapper.vm.isWhite('white')).to.equal(true)
  })

  it('renders links correctly', () => {
    const wrapper = shallow(AppHeader)
    expect(wrapper.contains('.link-wrapper')).to.equal(false)
    // wrapper.setProps({ back: true })
    // expect(wrapper.contains('.link-wrapper')).to.equal(true)
  })
})
