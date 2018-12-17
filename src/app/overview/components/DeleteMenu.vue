<template>
  <div class="box red delete-container">
    <v-button
      aria-label="Trash"
      class="delete icon"
      @click.native="activate($event)">
      <feather-trash slot="icon" />
    </v-button>

    <div class="deletion-info">
      <p>{{ selectionCount }}</p>
    </div>

    <v-button
      color="red"
      aria-label="Cancel trash"
      class="cancel icon"
      @click.native="cancel($event)">
      <feather-x slot="icon" />
    </v-button>
  </div>
</template>

<script>
  export default {
    name: 'DeleteMenu',

    props: {
      selected: { type: Number, default: 0 }
    },

    components: {
      'feather-trash': () =>
        import('vue-feather-icons/icons/Trash2Icon' /* webpackChunkName: "icons" */),
      'feather-x': () =>
        import('vue-feather-icons/icons/XIcon' /* webpackChunkName: "icons" */)
    },

    computed: {
      selectionCount () {
        const term = (this.selected === 1) ? 'plant' : 'plants'
        return `${this.selected} ${term} selected.`
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

<style lang="postcss" scoped>
  .delete-container {
    display: flex;
    border-radius: 0;
    width: 100%;
    height: 100%;

    & button {
      width: var(--app-footer-size);
      height: var(--app-footer-size);
      display: flex;
      justify-content: center;
      flex: 1 0 auto;

      & svg {
        margin-right: 0;
      }

      &.delete:focus,
      &:focus {
        --button-focus: transparent;
        --button-background: var(--brand-yellow);
      }
    }

    & button.delete {
      --button-background: rgba(0, 0, 0, 0.2);
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    & button.cancel {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .deletion-info {
    width: 100%;
    display: flex;
    align-items: center;
    text-align: left;
    color: var(--text-color-inverse);
    padding: 0 var(--base-gap);

    & p {
      display: inline-block;
      font-weight: 500;
    }
  }
</style>
