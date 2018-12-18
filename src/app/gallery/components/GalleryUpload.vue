<template>
  <div class="gallery-upload">
    <file-upload
      ref="fileUpload"
      name="add-gallery-file"
      :disable-preview="true"
      @file-selected="onFileSelected" />

    <v-button
      aria-label="Add photo"
      type="circle"
      :color="editMode ? 'red' : 'default'"
      @click.native="onClickButton">
      <div v-if="!editMode"
        slot="icon"
        class="add-photo-icon">
        <feather-plus />
        <feather-image />
      </div>
      <feather-trash v-else />
    </v-button>
  </div>
</template>

<script>
  export default {
    name: 'GalleryUpload',

    props: {
      editMode: { type: Boolean, default: false }
    },

    components: {
      'feather-plus': () =>
        import('vue-feather-icons/icons/PlusIcon' /* webpackChunkName: "icons" */),
      'feather-image': () =>
        import('vue-feather-icons/icons/ImageIcon' /* webpackChunkName: "icons" */),
      'feather-trash': () =>
        import('vue-feather-icons/icons/TrashIcon' /* webpackChunkName: "icons" */)
    },

    methods: {
      onFileSelected (data) {
        this.$emit('photo-selected', data)
      },

      onClickButton () {
        if (!this.editMode) {
          this.$emit('trigger-selection')
        } else {
          this.$emit('trigger-delete')
        }
      },

      triggerUpload () {
        this.$refs.fileUpload.triggerUpload()
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .gallery-upload {
    position: fixed;
    bottom: var(--base-gap);
    z-index: 1;

    & .file-upload {
      position: absolute;
      left: 0;
      transform: translateX(-100%);
      height: 0;
      opacity: 0;
    }

    & .add-photo-icon {
      transform: translate(1px, 2px);

      & svg:nth-of-type(1) {
        position: absolute;
        background: var(--button-background);
        border-radius: 50%;
        transform: scale(0.8) translateY(-9px) translateX(-9px);
      }
    }
  }
</style>
