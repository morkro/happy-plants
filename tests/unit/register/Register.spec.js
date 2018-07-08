import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueSVGIcon from 'vue-svgicon'
import Register from '@/app/register/Register'
import store from '@/store'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueSVGIcon)

describe('app/register/Register.vue', () => {
  const options = { localVue, store }

  it('is a Vue component', () => {
    const wrapper = mount(Register, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('computed prop canRegisterPlant()', () => {
    const wrapper = mount(Register, options)
    expect(wrapper.vm.canRegisterPlant).toBe(false)

    const input = wrapper.find('input#register-name')
    input.element.value = 'foo'
    input.trigger('change')
    expect(wrapper.vm.canRegisterPlant).toBe(true)
  })

  it('getName() works', () => {
    const wrapper = mount(Register, options)
    expect(wrapper.vm.name).toEqual('')

    const input = wrapper.find('input#register-name')
    input.element.value = 'foo'
    input.trigger('change')
    expect(wrapper.vm.name).toEqual('foo')
  })
})
