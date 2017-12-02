<template>
  <div :class="{ 'footer-deletion': true, 'active': activeSelection }">
    <button
      aria-label="Trash"
      :class="buttonDeleteClass"
      @click="activate($event)">
      <feather-trash width="18" height="18" />
    </button>

    <div class="deletion-info">
      <p>{{ selectionCount }}</p>
    </div>

    <button
      aria-label="Cancel trash"
      class="cancel icon"
      @click="cancel($event)">
      <feather-x width="24" height="24" />
    </button>
  </div>
</template>

<script>
  export default {
    name: 'SelectionDelete',

    props: {
      activeSelection: { type: Boolean, default: false },
      selected: { type: Number, default: 0 }
    },

    components: {
      'feather-trash': () =>
        import('vue-feather-icon/components/trash-2' /* webpackChunkName: "overview" */),
      'feather-x': () =>
        import('vue-feather-icon/components/x' /* webpackChunkName: "overview" */)
    },

    computed: {
      selectionCount () {
        const term = (this.selected === 1) ? 'plant' : 'plants'
        return `${this.selected} ${term} selected.`
      },
      buttonDeleteClass () {
        if (this.activeSelection) {
          return 'delete icon'
        }
        return 'delete circle icon inverse'
      }
    },

    methods: {
      activate (event) {
        if (event.currentTarget) event.currentTarget.blur()
        this.$emit('delete-selection')
      },
      cancel (event) {
        if (event.currentTarget) event.currentTarget.blur()
        this.$emit('cancel-selection')
      }
    }
  }
</script>

<style lang="scss" scoped>
  $footer-btn-size-secondary: 50px;

  .footer-deletion {
    p {
      display: none;
    }

    button {
      width: $footer-btn-size-secondary;
      height: $footer-btn-size-secondary;
      flex: 1 0 auto;
    }

    &:not(.active) button.delete {
      padding: 0;
      background: var(--background-primary);
      box-shadow: var(--plain-shadow);
    }

    button.cancel {
      display: none;
    }
  }

  .footer-deletion.active {
    display: flex;
    background: var(--brand-red);
    border-radius: var(--border-radius);
    box-shadow: var(--plain-shadow);
    width: 100%;

    button {
      display: flex;
      justify-content: center;

      svg {
        margin-right: 0;
      }
    }

    button.delete {
      background: rgba(0, 0, 0, 0.2);
    }

    p {
      display: inline-block;
    }
  }

  .deletion-info {
    width: 100%;
    display: flex;
    align-items: center;
    text-align: left;
    color: var(--text-color-inverse);
    padding: 0 var(--base-gap);

    p {
      font-weight: 600;
    }
  }
</style>
