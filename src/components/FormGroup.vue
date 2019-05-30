<script>
  export default {
    name: 'FormGroup',

    props: {
      error: { type: Boolean, default: false },
      required: { type: Boolean, default: false }
    },

    render (h) {
      const { error, required } = this
      return h(
        'label', {
          class: [
            'form-label-group',
            { error, required }
          ]
        }, [this.$slots.default]
      )
    }
  }
</script>

<style lang="postcss" scoped>
  .form-label-group {
    display: block;
    width: 100%;
    margin-bottom: calc(var(--base-gap) * 2);
    position: relative;

    & h2 {
      margin-bottom: calc(var(--base-gap) / 2);
    }

    &.required h2::after {
      color: var(--text-color-button);
      content: "*";
      font-size: var(--text-size-medium);
      background: var(--brand-red);
      border-radius: 50%;
      width: var(--icon-size-small);
      height: var(--icon-size-small);
      display: inline-flex;
      justify-content: center;
      align-content: center;
      margin-left: calc(var(--base-gap) / 2);
    }

    & input {
      width: 100%;
    }

    & > span {
      display: block;
      color: var(--text-color-secondary);
      font-size: var(--text-size-small);
      margin-bottom: calc(var(--base-gap) / 2);
      padding: 0 1px;
    }

    & .form-group-error {
      color: var(--brand-red);
      font-size: var(--text-size-xsmall);
      width: 100%;
      margin-top: calc(var(--base-gap) / 2);
    }
  }
</style>
