<template>
  <div class="gallery-options">
    <div class="gallery-steps">
      <span>{{ current }}</span>
      <span>/</span>
      <span>{{ total }}</span>
    </div>
    <v-button
      :type="['circle', 'small']"
      class="gallery-delete icon inverse"
      @click.native="onDeleteButton"
    >
      <template v-slot:icon>
        <feather-trash />
      </template>
    </v-button>
  </div>
</template>

<script>
  export default {
    name: 'GalleryOptions',

    props: {
      current: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    },

    components: {
      'feather-trash': () =>
        import('vue-feather-icons/icons/TrashIcon' /* webpackChunkName: "icons" */)
    },

    methods: {
      onDeleteButton () {
        this.$emit('delete-photo')
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .gallery-options {
    position: fixed;
    bottom: 0;
    z-index: 2;
    width: 100vw;
    height: var(--app-footer-size);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--base-gap);

    & .gallery-steps {
      align-self: center;
      color: var(--text-color-inverse);
      background: var(--custom-black);
      padding:
        calc(var(--base-gap) / 4)
        calc(var(--base-gap) / 2);
      border-radius: var(--border-radius);
      font-size: var(--text-size-xsmall);
    }

    & .gallery-delete {
      background: transparent;
      box-shadow: none;
    }
  }
</style>
