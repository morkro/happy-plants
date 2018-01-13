<template>
  <div class="box red delete-container">
    <button
      aria-label="Trash"
      class="delete icon"
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
    name: 'DeleteMenu',

    props: {
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
  $footer-size: 45px;

  .delete-container {
    display: flex;
    width: 100%;
    height: 100%;

    button {
      width: $footer-size;
      height: $footer-size;
      display: flex;
      justify-content: center;
      flex: 1 0 auto;

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
    display: flex;
    align-items: center;
    text-align: left;
    color: var(--text-color-inverse);
    padding: 0 var(--base-gap);

    p {
      display: inline-block;
      font-weight: 600;
    }
  }
</style>
