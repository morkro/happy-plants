<template>
  <component :is="textNode" :class="textClass">
    <slot />
  </component>
</template>

<script lang="ts">
  import Vue from 'vue'

  const types = new Map([
    ['hero', { node: 'span', small: false }],
    ['title', { node: 'h1', small: false }],
    ['subtitle', { node: 'h2', small: false }],
    ['text', { node: 'p', small: true }],
    ['input', { node: 'span', small: true }],
    ['button', { node: 'span', small: true }],
  ])
  const colors = ['normal', 'inactive', 'special', 'warning']

  export default Vue.extend({
    name: 'VText',

    props: {
      type: {
        type: String,
        default: 'text',
        validator: (v) => types.has(v),
      },
      small: {
        type: Boolean,
        default: false,
      },
      color: {
        type: String,
        default: 'normal',
        validator: (v) => colors.includes(v),
      },
    },

    computed: {
      textNode(): string {
        return types.get(this.type).node
      },
      textSize(): string {
        return types.get(this.type).small === this.small && 'small'
      },
      textClass(): string[] {
        const typeNotText = this.type && this.type !== 'text'
        return ['text', typeNotText ? this.type : '', this.textSize, this.color]
      },
    },
  })
</script>

<style lang="postcss">
  .text {
    font-size: var(--text-size-base);
    color: var(--brand-green-dark);

    /* Size */
    &.small {
      font-size: 87.5%;
    }

    /* Type */
    &.hero {
      font-size: 175%; /* 28px */
      font-weight: 700;
    }

    &.title {
      font-size: 150%; /* 24px */
      font-weight: 500;
    }

    &.subtitle {
      font-size: 125%; /* 20px */
      font-weight: 500;
    }

    &.button {
      font-weight: 500;
    }

    &.input {
      font-family: 'FiraMono', 'Courier New', Courier, monospace;
    }

    /* Color */
    &.inactive {
      color: var(--brand-beige-dark);
    }

    &.special {
      color: var(--brand-white);
    }

    &.warning {
      color: var(--brand-red);
    }
  }
</style>
