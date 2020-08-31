<template>
  <transition
    :name="transitionName"
    :mode="transitionMode"
    :enter-active-class="transitionEnterActiveClass"
    :leave-active-class="transitionLeaveActiveClass"
    @before-enter="beforeEnter"
    @after-leave="afterLeave"
  >
    <slot />
  </transition>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Route } from 'vue-router'

  const defaultTransition = 'slide'
  const defaultTransitionMode = 'out-in'

  export default Vue.extend({
    name: 'ScreenTransition',
    data: () => ({
      transitionName: defaultTransition,
      transitionMode: defaultTransitionMode,
      transitionEnterActiveClass: '',
      transitionLeaveActiveClass: '',
    }),
    created() {
      this.$router.beforeEach((to: Route, from: Route, next) => {
        const logoutScenario = from.path === '/settings' && to.path === '/welcome'
        const loginScenario = from.path === '/login' && to.path === '/home'
        if (logoutScenario || loginScenario) {
          next()
          return
        }

        let transitionName: string =
          to.meta.transitionName || from.meta.transitionName || defaultTransition

        if (transitionName === 'slide') {
          const toDepth = to.path.split('/').length
          const fromDepth = from.path.split('/').length
          transitionName = toDepth < fromDepth ? `slide-right` : `slide-left`
        }

        this.transitionMode = defaultTransitionMode

        if (transitionName === 'slide-up') {
          if (from.meta.transitionName === 'slide-up') {
            transitionName = 'slide-down'
          }
          this.transitionMode = 'in-out'
        }

        this.transitionEnterActiveClass = `${transitionName}-enter-active`
        this.transitionLeaveActiveClass = `${transitionName}-leave-active`
        this.transitionName = transitionName

        next()
      })
    },
    methods: {
      beforeEnter() {
        console.log(this.transitionName, 'beforeLeave')
      },
      afterLeave() {
        console.log(this.transitionName, 'afterEnter')
      },
    },
  })
</script>

<style lang="postcss">
  :root {
    --screen-transition: 250ms;
  }

  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition-duration: var(--screen-transition);
    transition-property: opacity, transform;
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
    overflow: hidden;
  }
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    transform: translate(2em, 0);
  }
  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    transform: translate(-2em, 0);
  }

  /** SLIDE UP */

  .slide-up-enter-active,
  .slide-up-leave-active,
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition-duration: var(--screen-transition);
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
    overflow: hidden;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }

  .slide-up-enter-active,
  .slide-down-leave-active {
    z-index: 1;
  }

  .slide-up-leave-active,
  .slide-down-enter-active {
    z-index: -1;
  }

  .slide-up-enter,
  .slide-down-leave-active {
    transform: translateY(100%);
  }
</style>
