<template>
  <plant-component>
    <feather-image slot="icon" />
    <h2 slot="title">Gallery</h2>
    <v-touch
      tag="div"
      slot="content"
      @tap="forwardGallery"
      @click="forwardGallery">
      <ul class="gallery-list">
        <li>
          <lazy-image source="" alt="" />
        </li>
        <li>
          <lazy-image source="" alt="" />
        </li>
        <li>
          <lazy-image source="" alt="" />
        </li>
        <li>
          <lazy-image source="" alt="" />
        </li>
      </ul>
    </v-touch>
  </plant-component>
</template>

<script>
  import LazyImage from '@/components/LazyImage'
  import PlantComponent from './PlantComponent'
  export default {
    name: 'PlantGallery',

    components: {
      'lazy-image': LazyImage,
      'plant-component': PlantComponent,
      'feather-image': () =>
        import('vue-feather-icons/icons/ImageIcon' /* webpackChunkName: "icons" */)
    },

    methods: {
      forwardGallery () {
        this.$router.push(`/gallery/${this.$route.params.id}`)
      }
    }
  }
</script>

<style lang="postcss">
  .gallery-list {
    list-style: none;
    display: flex;
    justify-content: space-between;
    margin-top: var(--base-gap);
    border-radius: var(--border-radius);
    overflow: hidden;
    --preview-size: calc(25vw - 0.5 * var(--base-gap));

    & li {
      width: var(--preview-size);
      height: var(--preview-size);
    }

    & li > div {
      width: 100%;
      height: 100%;
      background: var(--grey);
    }
  }
</style>
