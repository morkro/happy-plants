import { mount } from 'vue-test-utils'
import AppHeader from '@/components/AppHeader'

/**
 * TODO:
 * - Test the slots
 * - Test backPath click with vue-router
 * - Test settings button
 */

describe('components/AppHeader.vue', () => {
  it('is a Vue component', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.isVueInstance()).to.equal(true)
  })

  it('has correct default props data', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.props().backPath).to.equal('/')
    expect(wrapper.props().back).to.equal(false)
    expect(wrapper.props().settings).to.equal(false)
    expect(wrapper.props().color).to.equal('black')
  })

  it('isWhite() works as expected', () => {
    const wrapper = mount(AppHeader)
    expect(typeof wrapper.vm.isWhite).to.equal('function')
    expect(wrapper.vm.isWhite('foo')).to.equal(false)
    expect(wrapper.vm.isWhite('white')).to.equal(true)
  })
})
