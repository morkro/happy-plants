import { shallowMount, createLocalVue } from '@vue/test-utils'
import { ArrowRightIcon, LoaderIcon } from 'vue-feather-icons'
import IntroStart from '@/app/intro/screens/Welcome'
import PlantWatering from '@/app/plant/components/PlantWatering'
import PlantSunshine from '@/app/plant/components/PlantSunshine'
import PlantSeasons from '@/app/plant/components/PlantSeasons'
import Button from '@/components/Button'
import AuthProviderList from '@/components/AuthProviderList'
import Box from '@/components/Box'
import store from '@/store'
import router from '@/router'

Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn()
})

const localVue = createLocalVue()

describe('app/intro/Welcome.vue', () => {
  const options = {
    localVue,
    store,
    router,
    stubs: {
      'v-box': Box,
      'v-button': Button,
      'plant-watering': PlantWatering,
      'plant-sunshine': PlantSunshine,
      'plant-seasons': PlantSeasons,
      'feather-right': ArrowRightIcon,
      'feather-loader': LoaderIcon,
      'better-dialog': '<div />',
      'v-carousel': '<div />',
      'auth-provider-list': AuthProviderList
    }
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
