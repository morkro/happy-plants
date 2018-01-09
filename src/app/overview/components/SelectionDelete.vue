<template>
  <div :class="wrapperClass">
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
      wrapperClass () {
        return {
          'box': this.activeSelection,
          'red': this.activeSelection,
          'delete-container': true,
          'active': this.activeSelection
        }
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
  $btn-size: 50px;

  .delete-container {
    button {
      width: $btn-size;
      height: $btn-size;
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

  .delete-container.active {
    display: flex;
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
  }

  .deletion-info {
    width: 100%;
    display: none;
    align-items: center;
    text-align: left;
    color: var(--text-color-inverse);
    padding: 0 var(--base-gap);

    .active & {
      display: flex;
    }

    p {
      display: inline-block;
      font-weight: 600;
    }
  }
</style>
