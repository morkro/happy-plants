<template>
  <button type="button" :class="[color, type]">
    <div v-if="loading || !!$slots.icon" :class="getIconClass()">
      <feather-loader v-if="loading" />
      <slot v-else name="icon" />
    </div>

    <span v-if="!!$slots.default">
      <slot />
    </span>
  </button>
</template>

<script>
  const colors = ['plain', 'grey', 'default', 'yellow', 'red', 'transparent']
  const types = ['normal', 'circle', 'small']

  export default {
    name: 'Button',

    props: {
      loading: {
        type: Boolean,
        default: false
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
          return Array.isArray(value)
            ? value.every(v => types.includes(v))
            : types.includes(value)
        }
      }
    },

    components: {
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */)
    },

    methods: {
      getIconClass () {
        return ['button-icon', {
          single: !this.$slots.default,
          rotate: this.loading
        }]
      }
    }
  }
</script>

<style lang="postcss">
  @import "../styles/animations";

  button,
  .btn {
    --button-padding: 6px;
    --button-circle-size: 50px;
    --button-background: var(--brand-green);
    --button-focus: var(--brand-green-low);
    --button-icon: var(--text-color-button);
    --button-shadow: var(--brand-green-medium);
    --text-color: var(--text-color-button);

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: var(--button-background);
    font-size: var(--text-size-base);
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
      width: calc(100% - 4px);
      height: calc(100% - 4px);
      top: 0;
      left: 0;
      transform: translate(-4px, -4px);
      border-radius: var(--border-radius);
      background: transparent;
      border: 6px solid var(--button-focus);
      z-index: 0;
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
    }

    & .button-icon {
      width: var(--icon-size-base);
      height: var(--icon-size-base);
      display: flex;
      align-items: center;

      &:not(.single) {
        margin-right: calc(var(--base-gap) / 2);
      }

      &.rotate svg {
        transform-origin: center center;
        animation: rotate360 4s linear infinite;
      }
    }

    & .button-icon svg,
    & svg {
      width: var(--icon-size-base);
      height: var(--icon-size-base);
    }
  }

  button.circle,
  .btn.circle {
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
  .btn.small {
    --button-padding: 4px;
    --button-circle-size: 35px;

    & .button-icon {
      transform: scale(0.95);
    }
  }

  button.disabled,
  .btn.disabled,
  button[disabled],
  .btn[disabled] {
    --button-background: var(--grey);
    --button-shadow: var(--grey);
    color: var(--dark-grey);
    cursor: not-allowed;

    & .button-icon svg {
      filter: invert(100%);
    }
  }

  button.plain,
  .btn.plain {
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
  .btn.yellow {
    --button-background: var(--brand-yellow);
    --button-focus: var(--brand-yellow-low);
    --button-shadow: var(--brand-yellow-medium);
    --text-color: var(--link-color);
  }

  button.red,
  .btn.red {
    --button-background: var(--brand-red);
    --button-focus: var(--brand-red-low);
    --button-shadow: var(--brand-red-medium);
  }

  button.grey,
  .btn.grey {
    --button-background: var(--dark-grey);
    --button-focus: var(--grey);
    --button-shadow: var(--dark-grey);
  }

  button.transparent,
  .btn.transparent {
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
