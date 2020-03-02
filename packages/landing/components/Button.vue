<template>
  <component
    :is="tag"
    :type="buttonType"
    :class="[color, type]"
  >
    <div v-if="$slots.icon || $scopedSlots.icon" :class="getIconClass()">
      <slot name="icon" />
    </div>

    <span v-if="$slots.default || $scopedSlots.default">
      <slot />
    </span>
  </component>
</template>

<script>
  const colors = ['plain', 'grey', 'default', 'yellow', 'red', 'blue', 'transparent']
  const types = ['normal', 'circle', 'small']
  const tags = ['button', 'a']

  export default {
    name: 'Button',

    props: {
      tag: {
        type: String,
        default: 'button',
        validator: v => tags.includes(v)

      },
      color: {
        type: String,
        default: 'default',
        validator: v => colors.includes(v)
      },
      type: {
        type: [String, Array],
        default: 'normal',
        validator: value => {
          if (value === 'submit') return value
          return Array.isArray(value)
            ? value.every(v => types.includes(v))
            : types.includes(value)
        }
      }
    },

    computed: {
      buttonType () {
        if (this.tag === 'a') return
        return this.type === 'submit' ? this.type : 'button'
      }
    },

    methods: {
      getIconClass () {
        return ['button-icon', {
          single: !this.$scopedSlots.default
        }]
      }
    }
  }
</script>

<style lang="postcss" scoped>
  button,
  a {
    --button-padding: 6px;
    --button-circle-size: 50px;
    --button-background: var(--brand-green);
    --button-focus: var(--brand-green-low);
    --button-icon: var(--text-color-button);
    --button-shadow: var(--brand-green-medium);
    --button-font-size: var(--text-size-base);
    --text-color: var(--text-color-button);

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: var(--button-background);
    font-family: var(--font-family);
    font-size: var(--button-font-size);
    font-weight: 500;
    text-decoration: none;
    color: var(--text-color);
    border: none;
    border-radius: var(--border-radius);
    padding: calc(2 * var(--button-padding)) calc(3 * var(--button-padding));
    transition: background-color 100ms var(--ease-out-back);
    box-shadow: 0 2px 9px var(--button-shadow);

    &::after {
      opacity: 0;
      content: "";
      position: absolute;
      width: calc(100% + 8px);
      height: calc(100% + 8px);
      top: 0;
      left: 0;
      transform: translate(-4px, -4px);
      border-radius: var(--border-radius);
      background: transparent;
      border: 6px solid var(--button-focus);
      z-index: 0;
    }

    &:hover {
      text-decoration: underline;
    }

    &:active,
    &:focus {
      outline: none;
      text-decoration: none;
    }

    &:active::after,
    &:focus::after {
      opacity: 1;
    }

    & span {
      color: var(--text-color);
      font-family: inherit;
    }

    & .button-icon {
      width: var(--icon-size-base);
      height: var(--icon-size-base);
      display: flex;
      align-items: center;

      &:not(.single) {
        margin-right: calc(var(--base-gap) / 2);
      }
    }

    & .button-icon svg,
    & svg {
      width: var(--icon-size-base);
      height: var(--icon-size-base);
    }
  }

  button.circle,
  a.circle {
    border-radius: 50%;
    width: var(--button-circle-size);
    height: var(--button-circle-size);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;

    & .button-icon svg {
      margin: 0 auto;
    }

    &::after {
      border-radius: 50%;
    }
  }

  button.small,
  a.small {
    --button-padding: 4px;
    --button-circle-size: 35px;

    & .button-icon {
      transform: scale(0.95);
    }
  }

  button.disabled,
  a.disabled,
  button[disabled],
  a[disabled] {
    --button-background: var(--grey);
    --button-shadow: var(--grey);
    color: var(--dark-grey);
    cursor: not-allowed;

    & .button-icon svg {
      filter: invert(100%);
    }
  }

  button.plain,
  a.plain {
    --button-background: var(--grey);
    --button-focus: var(--dark-grey);
    --button-shadow: var(--grey);
    --text-color: var(--link-color);

    @nest html[data-theme="dark"] & {
      --button-background: var(--dark-grey);
      --button-focus: var(--grey);
      --text-color: white;
    }
  }

  button.yellow,
  a.yellow {
    --button-background: var(--brand-yellow);
    --button-focus: var(--brand-yellow-low);
    --button-shadow: var(--brand-yellow-medium);
    --text-color: var(--link-color);
  }

  button.red,
  a.red {
    --button-background: var(--brand-red);
    --button-focus: var(--brand-red-low);
    --button-shadow: var(--brand-red-medium);
  }

  button.blue,
  a.blue {
    --button-background: var(--brand-blue);
    --button-focus: var(--brand-blue-low);
    --button-shadow: var(--brand-blue-medium);
  }

  button.grey,
  a.grey {
    --button-background: var(--dark-grey);
    --button-focus: var(--grey);
    --button-shadow: var(--dark-grey);
  }

  button.transparent,
  a.transparent {
    --button-background: transparent;
    --button-focus: transparent;
    --button-shadow: transparent;

    & .button-icon svg {
      filter: invert(100%);

      @nest html[data-theme="dark"] & {
        filter: invert(0);
      }
    }
  }
</style>
