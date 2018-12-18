<template>
  <div :class="['gallery-image', { selectable }]">
    <div class="gallery-image-cover">
      <feather-trash v-if="selected" />
      <feather-circle v-else />
    </div>
    <lazy-image
      :source="source"
      :alt="name"
      :title="name" />
  </div>
</template>

<script>
  export default {
    name: 'GalleryImage',

    props: {
      source: { type: String, required: true },
      name: { type: String, required: true },
      selectable: { type: Boolean, default: false },
      selected: { type: Boolean, default: false }
    },

    components: {
      'feather-circle': () =>
        import('vue-feather-icons/icons/CircleIcon' /* webpackChunkName: "icons" */),
      'feather-trash': () =>
        import('vue-feather-icons/icons/TrashIcon' /* webpackChunkName: "icons" */)
    }
  }
</script>

<style lang="postcss">
  .gallery-image {
    position: relative;

    &.selectable .gallery-image-cover {
      display: flex;
    }
  }

  .gallery-image-cover {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--transparency-black-medium);
    justify-content: center;
    align-items: center;
    z-index: 1;

    @nest .selected & {
      background: var(--brand-red-medium);

      &::after {
        content: "";
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: absolute;
        z-index: 0;
        background: var(--brand-red);
      }
    }

    & svg {
      stroke: var(--text-color-button);
      position: relative;
      z-index: 1;

      & rect,
      & path,
      & polygon {
        stroke: var(--text-color-button);
      }
    }
  }
</style>
