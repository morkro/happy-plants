<template>
  <div :class="['main-wireframe', { fullscreen }]">
    <main class="app-content">
      <ul class="gallery-list">
        <li @click="activateFullscreen">
          <lazy-image
            v-if="plant.imageURL"
            :source="plant.imageURL"
            :alt="plant.name" />
        </li>
        <li @click="activateFullscreen">
          <lazy-image
            v-if="plant.imageURL"
            :source="plant.imageURL"
            :alt="plant.name" />
        </li>
        <li @click="activateFullscreen">
          <lazy-image
            v-if="plant.imageURL"
            :source="plant.imageURL"
            :alt="plant.name" />
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import LazyImage from '@/components/LazyImage'
  export default {
    name: 'Gallery',

    meta () {
      return {
        title: this.plant.name
      }
    },

    components: {
      'lazy-image': LazyImage
    },

    data: () => ({
      fullscreen: false
    }),

    computed: {
      ...mapState({
        plantsData: state => state.plants.data,
        plant: state => state.selected
      })
    },

    watch: {
      plantsData (data) {
        if (data.length) {
          this.loadPlantItem(this.$route.params.id)
        }
      }
    },

    methods: {
      ...mapActions([
        'updateAppHeader',
        'loadPlantItem'
      ]),
      activateFullscreen () {
        this.fullscreen = true
        this.updateAppHeader({
          transparent: true,
          title: 'Some file name',
          backBtn: false,
          rightBtn: 'close',
          rightBtnOnClick: this.deactivateFullscreen
        })
      },
      deactivateFullscreen () {
        this.fullscreen = false
        this.updateAppHeader({
          transparent: false,
          title: 'Gallery',
          backBtn: true,
          rightBtn: false
        })
      }
    },

    created () {
      this.updateAppHeader({
        title: 'Gallery',
        backBtn: true,
        backBtnPath: `/plant/${this.$route.params.id}`,
        rightBtn: false
      })
    },

    mounted () {
      if (!this.plant.guid) {
        this.loadPlantItem(this.$route.params.id)
      }
    },

    beforeDestroy () {
      if (this.fullscreen) this.fullscreen = false
    }
  }
</script>

<style lang="postcss" scoped>
  .main-wireframe {
    min-height: 100vh;
    justify-content: center;
    background: var(--background-secondary);

    &.fullscreen {
      background: var(--custom-black);
    }
  }

  .app-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: var(--base-gap);
    overflow: hidden;
  }

  .gallery-list {
    list-style: none;
    display: flex;
    width: 100%;
    --preview-size: calc(25vw - 0.5 * var(--base-gap));

    @nest .fullscreen & li {
      width: 100vw;
      height: 100vh;
    }

    & li {
      width: var(--preview-size);
      height: var(--preview-size);
    }
  }
</style>
