<template>
  <v-layout class="screen-onboarding-success">
    <main>
      <div class="onboarding-success-content">
        <div class="content-title">
          <v-text type="title">You're ready to go!</v-text>
          <svg
            width="183px"
            height="26px"
            viewBox="0 0 183 26"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g id="Mobile" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g transform="translate(-89.000000, -384.000000)" fill="#FFFFFF">
                <path
                  d="M270.938244,385.677683 C271.942523,395.596015 271.559638,389.46473 269.978467,401.661768 C269.653779,404.171868 267.588625,405.660383 263.863109,406.236554 C232.74175,411.04956 120.586519,411.13392 92.4930016,406.275158 C89.1021246,399.807146 88.9647761,392.987789 91.9149725,388.065286 C96.8214768,386.285074 91.8943925,388.359593 187.190232,388.079604 C234.283148,387.93998 249.878693,386.00734 260.316144,385.374741 C263.404732,385.186277 266.502335,384.429699 270.938244,385.677683"
                  id="Fill-88"
                  transform="translate(180.655687, 397.429042) scale(1, -1) translate(-180.655687, -397.429042) "
                />
              </g>
            </g>
          </svg>
        </div>
        <router-link to="/new" class="btn">Add your first plant</router-link>
      </div>
      <success-illustration class="onboarding-success-illustration" />
    </main>
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Illustration from '@/modules/onboarding/components/Illustration.vue'

  export default Vue.extend({
    name: 'OnboardingSuccess',

    components: {
      'success-illustration': Illustration,
    },
  })
</script>

<style lang="postcss" scoped>
  .screen-onboarding-success {
    width: 100%;
    position: relative;
  }

  .onboarding-success-content {
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(50%);

    & .content-title {
      position: relative;

      & svg {
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
      }
    }

    & a {
      margin-top: 80px;
    }
  }

  .onboarding-success-illustration {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
