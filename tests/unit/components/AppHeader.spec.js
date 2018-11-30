import { shallowMount, createLocalVue } from '@vue/test-utils'
import AppHeader from '@/components/AppHeader'

const localVue = createLocalVue()

/**
 * TODO:
 * - Test the slots
 * - Test backPath click with vue-router
 * - Test settings button
 */

describe('components/AppHeader.vue', () => {
  const options = {
    localVue,
    slots: {
      default: '<h1>Title</h1>'
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(AppHeader, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const rightBtnOnClick = jest.fn()
    const wrapper = shallowMount(AppHeader, { ...options, propsData: { rightBtnOnClick } })
    expect(wrapper.props().backPath).toEqual('/')
    expect(wrapper.props().backButton).toEqual(false)
    expect(wrapper.props().rightBtn).toEqual(false)
    expect(wrapper.props().color).toEqual('black')
    expect(wrapper.props().rightBtnOnClick).toEqual(rightBtnOnClick)
  })

  it('settingsOnClick() works as expected', () => {
    const rightBtnOnClick = jest.fn()
    const wrapper = shallowMount(AppHeader, { ...options,
      propsData: {
        rightBtnOnClick,
        rightBtn: 'edit'
      }
    })
    expect(wrapper.find('.edit-data').exists()).toBe(true)
    wrapper.find('.edit-data').trigger('click')
    expect(wrapper.vm.rightBtnOnClick).toHaveBeenCalled()
  })

  it('isWhite() works as expected', () => {
    const wrapper = shallowMount(AppHeader, options)
    expect(typeof wrapper.vm.isWhite).toEqual('function')
    expect(wrapper.vm.isWhite('foo')).toEqual(false)
    expect(wrapper.vm.isWhite('white')).toEqual(true)
  })

  it('scrollTop()', () => {
    const wrapper = shallowMount(AppHeader, options)
    wrapper.setProps({ scrollUp: false })
    expect(wrapper.vm.scrollTop()).toEqual(undefined)
  })
})
