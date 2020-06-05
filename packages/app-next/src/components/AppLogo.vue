<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 30" id="app-logo">
    <g fill="none" fill-rule="evenodd">
      <path
        :stroke="logoColor"
        stroke-linejoin="bevel"
        stroke-width="2"
        d="M21.338 6.447c2.967-2.002 6.128-3.164 8.194-1.957 4.192 2.449 2.288 13.724-.157 18.008-2.321 4.068-7.29 5.614-11.374 3.663 3.701-1.049 6.418-4.516 6.418-8.632 0-2.804-1.261-7.465-3.235-10.977z"
      />
      <path
        :stroke="logoColor"
        stroke-linecap="round"
        stroke-linejoin="bevel"
        stroke-width="2"
        d="M3.417 10.91c1.229-.68 2.902-.36 4.624.486-.599 1.951-.948 3.814-.972 5.221-.08 4.62 3.258 8.494 7.66 9.157a7.058 7.058 0 01-2.1 1.77c-3.381 1.876-7.622.69-9.473-2.651-1.85-3.341-3.12-12.106.261-13.982z"
      />
      <path
        :fill="logoColor"
        d="M15 1c4.97 0 9 10.892 9 15.915 0 4.885-3.81 8.87-8.592 9.085v-3.925l3.908-4.81.02-.028a.41.41 0 00-.078-.548.407.407 0 00-.574.059l-3.276 4.033v-4.756l2.87-3.777.018-.028a.41.41 0 00-.096-.545.407.407 0 00-.571.077l-2.221 2.924V6.002l-.001-.03a.408.408 0 00-.815.03v8.744l-2.274-2.994-.021-.026a.407.407 0 00-.55-.051.41.41 0 00-.077.573l2.922 3.847v4.7l-3.3-4.064-.023-.025a.407.407 0 00-.551-.033.41.41 0 00-.059.575l3.933 4.841V26C9.811 25.785 6 21.8 6 16.915 6 11.892 10.03 1 15 1z"
      />
      <path
        :stroke="logoColor"
        stroke-width="1.5"
        d="M15 26c4.97 0 9-4.07 9-9.09C24 11.887 19.97 1 15 1S6 11.888 6 16.91C6 21.93 10.03 26 15 26"
      />
    </g>
  </svg>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'AppLogo',
    props: {
      color: {
        type: String,
        validator: v => ['white', 'green'].includes(v),
      },
    },
    computed: {
      logoColor() {
        if (this.color === 'green') {
          return 'var(--brand-green-dark)'
        }
        return 'var(--brand-white)'
      },
    },
  })
</script>

<style lang="postcss" scoped>
  #app-logo {
    width: 32px;
    height: 28px;
  }
</style>
