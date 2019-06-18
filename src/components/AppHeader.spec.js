import { shallowMount, createLocalVue } from '@vue/test-utils'
import AppHeader from '@/components/AppHeader'
import Button from '@/components/Button'

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
    },
    stubs: {
      'v-button': Button,
      'feather-arrow-left': '<svg />',
      'feather-settings': '<svg />',
      'feather-edit': '<svg />',
      'feather-close': '<svg />'
    }
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(AppHeader, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('has correct default props data', () => {
    const rightButtonOnClick = jest.fn()
    const wrapper = shallowMount(AppHeader, { ...options, propsData: { rightButtonOnClick } })
    expect(wrapper.props().backPath).toEqual('/')
    expect(wrapper.props().backButton).toEqual(false)
    expect(wrapper.props().rightButton).toEqual(false)
    expect(wrapper.props().color).toEqual('black')
    expect(wrapper.props().rightButtonOnClick).toEqual(rightButtonOnClick)
  })

  it('settingsOnClick() works as expected', () => {
    const rightButtonOnClick = jest.fn()
    const wrapper = shallowMount(AppHeader, { ...options,
      propsData: {
        rightButtonOnClick,
        rightButton: 'edit'
      }
    })
    expect(wrapper.find('.edit-data').exists()).toBe(true)
    wrapper.find('.edit-data').trigger('click')
    expect(wrapper.vm.rightButtonOnClick).toHaveBeenCalled()
  })

  it('isWhite() works as expected', () => {
    const wrapper = shallowMount(AppHeader, options)
    expect(typeof wrapper.vm.isWhite).toEqual('function')
    expect(wrapper.vm.isWhite('foo')).toEqual(false)
    expect(wrapper.vm.isWhite('white')).toEqual(true)
  })

  it('onScrollTop()', () => {
    const wrapper = shallowMount(AppHeader, options)
    wrapper.setProps({ scrollUp: false })
    expect(wrapper.vm.onScrollTop()).toEqual(undefined)
  })
})
