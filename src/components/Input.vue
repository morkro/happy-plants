<script>
  export default {
    name: 'Input',

    props: {
      value: { type: String, default: undefined }
    },

    render (h) {
      return h('input', {
        domProps: {
          value: this.value
        },
        on: {
          click: event => { this.$emit('click', event) },
          input: event => { this.$emit('input', event) },
          change: event => { this.$emit('change', event) }
        }
      })
    }
  }
</script>

<style lang="postcss" scoped>
  input {
    background: var(--form-color);
    padding: calc(var(--base-gap) + 5px) var(--base-gap);
    color: var(--text-color-base);
    border: none;
    border-radius: var(--border-radius);

    &:active,
    &:focus {
      outline: none;
      box-shadow:
        0 0 0 2px var(--transparency-black-light),
        0 0 12px var(--transparency-black-light);
    }

    &:not([type="radio"]):valid {
      outline: none;
      box-shadow:
        0 0 0 2px var(--brand-green-medium),
        0 0 12px var(--brand-green-low);
    }

    &.invalid,
    &.invalid:valid,
    &:not([type="radio"]):not(:empty):invalid {
      outline: none;
      box-shadow:
        0 0 0 2px var(--brand-red),
        0 0 12px var(--brand-red-low);
    }

    &[type="radio"] {
      outline: 0;
      border: none;
      appearance: none;
      width: 22px;
      max-width: 22px;
      height: 22px;
      max-height: 22px;
      border-radius: 50%;
      box-shadow: none;
      padding: 0;
      background: var(--border-color);
      transition: background var(--base-speed) var(--ease-out-back);

      @nest html[data-theme="dark"] &:not(:checked) {
        background: var(--dark-grey);
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 4px var(--dark-grey);
      }

      &:checked {
        background: var(--brand-green);

        &:focus {
          box-shadow: 0 0 0 4px var(--brand-green-low);
        }
      }
    }
  }
</style>
