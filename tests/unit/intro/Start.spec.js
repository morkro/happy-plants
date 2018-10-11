import { shallowMount, createLocalVue } from '@vue/test-utils'
import IntroStart from '@/app/intro/components/Start'
import store from '@/store'
import router from '@/router'

const localVue = createLocalVue()

describe('app/settings/IntroStart.vue', () => {
  const options = {
    localVue,
    store,
    router
  }

  it('is a Vue component', () => {
    const wrapper = shallowMount(IntroStart, options)
    expect(wrapper.isVueInstance()).toEqual(true)
  })

  it('nextStep() returns undefined if sign in is in progress', () => {
    const wrapper = shallowMount(IntroStart, options)
    wrapper.vm.signInProgress = true
    expect(wrapper.vm.nextStep()).toBeUndefined()
  })

  it('loginUser() works as expected', async () => {
    const wrapper = shallowMount(IntroStart, options)
    wrapper.setMethods({ signInUser: jest.fn(), loadPlants: jest.fn(), loadTags: jest.fn() })
    await wrapper.vm.loginUser()
    expect(wrapper.vm.signInProgress).toBe(false)
  })

  it('loginUser() shows notification if sign in fails', async () => {
    const wrapper = shallowMount(IntroStart, options)
    wrapper.setMethods({ signInUser: Promise.reject(new Error()), showNotification: jest.fn() })
    await wrapper.vm.loginUser()
    expect(wrapper.vm.showNotification).toHaveBeenCalled()
  })
})
