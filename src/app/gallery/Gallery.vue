<!-- @click="showGallery(index)" -->
<template>
  <div :class="['main-wireframe', { fullscreen }]">
    <main class="app-content">
      <div v-if="fullscreen" class="gallery-steps">
        <span>{{ listIndex + 1 }}</span>
        <span>/</span>
        <span>{{ mockData.length }}</span>
      </div>

      <div v-if="!fullscreen" class="gallery-add">
        <v-button>
          <feather-plus slot="icon" />
          Add photo
        </v-button>
      </div>

      <v-touch tag="ul"
        class="gallery-list"
        ref="galleryList"
        @tap="showGallery"
        @panend="moveGallery"
        :pan-options="{ direction: 'horizontal' }"
        :style="listStyle">
        <li v-for="(plant, index) in mockData"
          :key="index">
          <div>
            <lazy-image
              v-if="plant.imageURL"
              :source="plant.imageURL"
              :alt="plant.name" />
          </div>
        </li>
      </v-touch>
    </main>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import LazyImage from '@/components/LazyImage'
  import Button from '@/components/Button'
  export default {
    name: 'Gallery',

    meta () {
      return {
        title: this.plant.name
      }
    },

    components: {
      'lazy-image': LazyImage,
      'v-button': Button,
      'feather-plus': () =>
        import('vue-feather-icons/icons/PlusIcon' /* webpackChunkName: "icons" */)
    },

    data: () => ({
      fullscreen: false,
      listDelta: 0,
      mockData: [
        { name: 'foo', imageURL: 'https://scontent-lhr3-1.cdninstagram.com/vp/d53e062c778e4ebb10469fb40178c477/5C736CF5/t51.2885-15/sh0.08/e35/p640x640/44249492_206290176949667_8900058224792858038_n.jpg' },
        { name: 'bar', imageURL: 'https://scontent-lhr3-1.cdninstagram.com/vp/ed58a02f88086e4a7f5cd0e9f9f5d76f/5C7B2724/t51.2885-15/e35/43676165_2224442211209374_5165817046013690281_n.jpg' },
        { name: 'baz', imageURL: 'https://scontent-lhr3-1.cdninstagram.com/vp/8c2eacb5fd8b2ba269f2867e24a3bf09/5CB17A19/t51.2885-15/sh0.08/e35/s750x750/41502991_235821707282272_6811129458316005659_n.jpg' },
        { name: 'wut', imageURL: 'https://scontent-lhr3-1.cdninstagram.com/vp/b9681184e443b7c6cf7e7184c695b46d/5CB0CE42/t51.2885-15/e35/41446460_333911860702639_4919339666817054196_n.jpg' },
        { name: 'foo', imageURL: 'https://scontent-lhr3-1.cdninstagram.com/vp/d53e062c778e4ebb10469fb40178c477/5C736CF5/t51.2885-15/sh0.08/e35/p640x640/44249492_206290176949667_8900058224792858038_n.jpg' },
        { name: 'bar', imageURL: 'https://scontent-lhr3-1.cdninstagram.com/vp/ed58a02f88086e4a7f5cd0e9f9f5d76f/5C7B2724/t51.2885-15/e35/43676165_2224442211209374_5165817046013690281_n.jpg' },
        { name: 'baz', imageURL: 'https://scontent-lhr3-1.cdninstagram.com/vp/8c2eacb5fd8b2ba269f2867e24a3bf09/5CB17A19/t51.2885-15/sh0.08/e35/s750x750/41502991_235821707282272_6811129458316005659_n.jpg' },
        { name: 'wut', imageURL: 'https://scontent-lhr3-1.cdninstagram.com/vp/b9681184e443b7c6cf7e7184c695b46d/5CB0CE42/t51.2885-15/e35/41446460_333911860702639_4919339666817054196_n.jpg' },
        { name: 'foo', imageURL: 'https://scontent-lhr3-1.cdninstagram.com/vp/d53e062c778e4ebb10469fb40178c477/5C736CF5/t51.2885-15/sh0.08/e35/p640x640/44249492_206290176949667_8900058224792858038_n.jpg' },
        { name: 'bar', imageURL: 'https://scontent-lhr3-1.cdninstagram.com/vp/ed58a02f88086e4a7f5cd0e9f9f5d76f/5C7B2724/t51.2885-15/e35/43676165_2224442211209374_5165817046013690281_n.jpg' },
        { name: 'baz', imageURL: 'https://scontent-lhr3-1.cdninstagram.com/vp/8c2eacb5fd8b2ba269f2867e24a3bf09/5CB17A19/t51.2885-15/sh0.08/e35/s750x750/41502991_235821707282272_6811129458316005659_n.jpg' },
        { name: 'wut', imageURL: 'https://scontent-lhr3-1.cdninstagram.com/vp/b9681184e443b7c6cf7e7184c695b46d/5CB0CE42/t51.2885-15/e35/41446460_333911860702639_4919339666817054196_n.jpg' },
        { name: 'wut2', imageURL: 'https://scontent-lhr3-1.cdninstagram.com/vp/b9681184e443b7c6cf7e7184c695b46d/5CB0CE42/t51.2885-15/e35/41446460_333911860702639_4919339666817054196_n.jpg' }
      ]
    }),

    computed: {
      ...mapState({
        plantsData: state => state.plants.data,
        plant: state => state.selected
      }),
      listStyle () {
        return {
          transform: `translateX(${this.listDelta}vw)`
        }
      },
      listIndex () {
        return (this.listDelta / 100 * -1)
      }
    },

    watch: {
      plantsData (data) {
        if (data.length) {
          this.loadPlantItem(this.$route.params.id)
        }
      },
      listDelta (delta) {
        const $galleryEl = this.$refs.galleryList.$el
        const $prevActiveEl = $galleryEl.querySelector('li.active')
        const $nextActiveEl = $galleryEl.children[-(delta / 100)]

        if ($prevActiveEl) {
          $prevActiveEl.classList.remove('active')
        }

        if ($nextActiveEl) {
          $nextActiveEl.classList.add('active')
        }
      }
    },

    methods: {
      ...mapActions([
        'updateAppHeader',
        'loadPlantItem'
      ]),
      showGallery (event) {
        const $selectedEl = event.target.closest('li')
        if ($selectedEl) {
          const index = Array
            .from(this.$refs.galleryList.$el.children)
            .findIndex($el => $el === $selectedEl)

          $selectedEl.classList.add('active')
          this.listDelta = -1 * (index * 100)
        }
        this.activateFullscreen()
      },
      closeGallery () {
        const $activeEl = this.$refs.galleryList.$el.querySelector('li.active')
        if ($activeEl) {
          $activeEl.classList.remove('active')
        }
        this.deactivateFullscreen()
      },
      moveGallery (event) {
        if (!this.fullscreen) return

        this.setGalleryAnimation()

        const isLastItem = this.listIndex === (this.mockData.length - 1)
        if (event.additionalEvent === 'panleft' && !isLastItem) {
          this.listDelta -= 100
        } else if (event.additionalEvent === 'panright' && this.listDelta !== 0) {
          this.listDelta += 100
        }

        const image = this.mockData[this.listIndex + 1]
        if (image) {
          this.updateAppHeader({ title: image.name })
        }
      },
      activateFullscreen () {
        this.fullscreen = true
        this.updateAppHeader({
          transparent: true,
          title: this.mockData[this.listIndex].name,
          backBtn: false,
          rightBtn: 'close',
          rightBtnOnClick: this.closeGallery
        })
      },
      deactivateFullscreen () {
        this.$refs.galleryList.$el.classList.remove('animated')
        this.fullscreen = false
        this.listDelta = 0
        this.updateAppHeader({
          transparent: false,
          title: 'Gallery',
          backBtn: true,
          rightBtn: false
        })
      },
      setGalleryAnimation () {
        const $galleryEl = this.$refs.galleryList.$el
        if (!$galleryEl.classList.contains('animated')) {
          $galleryEl.classList.add('animated')
        }
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
    justify-content: flex-flex-start;
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
    overflow: hidden;
  }

  .gallery-add {
    position: fixed;
    bottom: var(--base-gap);
    z-index: 1;
  }

  .gallery-steps {
    position: absolute;
    bottom: var(--base-gap);
    color: var(--text-color-inverse);
    background: var(--custom-black);
    padding:
      calc(var(--base-gap) / 4)
      calc(var(--base-gap) / 2);
    border-radius: var(--border-radius);
    font-size: var(--text-size-xsmall);
  }

  .gallery-list {
    list-style: none;
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    width: 100%;
    --preview-size: 50vw;

    @nest .fullscreen & {
      align-self: flex-start;
      flex-flow: nowrap;
    }

    @nest .fullscreen &.animated {
      transition: transform 100ms ease-in-out;
    }

    & li {
      width: var(--preview-size);
      height: var(--preview-size);
    }

    @nest .fullscreen & li {
      width: 100vw;
      height: calc(100vh - var(--double-gap) - var(--app-header-size));
      flex: 0 0 auto;
      padding: 0 var(--base-gap);
      border-radius: none;
      margin-bottom: 0;
    }

    & li > div {
      width: 100%;
      height: 100%;
    }

    @nest .fullscreen & >>> .lazy-image {
      --preview-background: transparent !important;
    }

    @nest .fullscreen & >>> .lazy-image img {
      object-fit: contain !important;
    }
  }
</style>
