import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Router from 'vue-router'
import VueSVGIcon from 'vue-svgicon'
import Register from '@/app/register/Register'
import store from '@/store'
import router from '@/router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)
localVue.use(VueSVGIcon)

describe('app/register/Register.vue', () => {
  const options = {
    localVue,
    store,
    router
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(Register, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('computed prop canRegisterPlant()', () => {
    const wrapper = shallowMount(Register, options)
    expect(wrapper.vm.canRegisterPlant).toBe(false)

    const input = wrapper.find('input#register-name')
    input.element.value = 'foo'
    input.trigger('change')
    expect(wrapper.vm.canRegisterPlant).toBe(true)
  })

  it('getName() works', () => {
    const wrapper = shallowMount(Register, options)
    expect(wrapper.vm.name).toEqual('')

    const input = wrapper.find('input#register-name')
    input.element.value = 'foo'
    input.trigger('change')
    expect(wrapper.vm.name).toEqual('foo')
    expect(wrapper.vm.getName({ target: {} })).toBeUndefined()
  })

  it('handleLoadingState() works', () => {
    const wrapper = shallowMount(Register, options)
    wrapper.vm.handleLoadingState({ loading: true })
    expect(wrapper.vm.isUploadingFile).toBe(true)
    wrapper.vm.handleLoadingState({ loading: false })
    expect(wrapper.vm.isUploadingFile).toBe(false)
  })

  it('getFile() works', () => {
    const wrapper = shallowMount(Register, options)
    const blob = new Blob()
    wrapper.vm.getFile({ blob })
    expect(wrapper.vm.blob).toEqual(blob)
  })

  it('async validateForm() works', async () => {
    const wrapper = shallowMount(Register, options)
    const input = wrapper.find('input#register-name')
    input.element.value = 'foo'
    input.trigger('change')

    await wrapper.vm.validateForm()
    expect(wrapper.vm.addPlantProgress).toBe(false)
    expect(store.state.plants.data).toHaveLength(1)
    expect(store.state.plants.data[0].name).toEqual('foo')
  })
})
