<template>
  <plant-component>
    <feather-image slot="icon" />
    <h2 slot="title">Gallery</h2>

    <div slot="content">
      <div v-if="!list.length" class="gallery-empty">
        <p>You haven't uploaded any photos yet.</p>
        <v-button @click.native="addFirstPhoto">
          Add your first photo
        </v-button>
      </div>

      <v-touch
        v-else
        tag="div"
        slot="content"
        @tap="forwardGallery"
        @click="forwardGallery">
        <ul class="gallery-list">
          <li v-for="(item, index) of previewList" :key="item.guid || index">
            <div v-if="item.empty" class="gallery-item-empty">
              <svgicon
                icon="cactus"
                width="40"
                height="40"
                color="#000" />
            </div>
            <lazy-image
              v-else
              :source="item.imageURL"
              :alt="item.fileName"
              :title="item.fileName" />
          </li>
        </ul>
      </v-touch>
    </div>
  </plant-component>
</template>

<script>
  import PlantComponent from './PlantComponent'
  import '@/assets/icons/cactus'

  export default {
    name: 'PlantGallery',

    components: {
      'plant-component': PlantComponent,
      'feather-image': () =>
        import('vue-feather-icons/icons/ImageIcon' /* webpackChunkName: "icons" */)
    },

    props: {
      gallery: {
        type: Array,
        default: () => []
      },
      list: {
        type: Array,
        default: () => []
      }
    },

    data: () => ({
      maxListCount: 4
    }),

    computed: {
      previewList () {
        const defaultItem = { empty: true }
        const defaultList = new Array(this.maxListCount).fill(defaultItem)
        const sliced = this.list.slice(0, this.maxListCount)

        for (let slicedIndex = 0; slicedIndex < sliced.length; slicedIndex++) {
          sliced[slicedIndex] = this.getGalleryItem(sliced[slicedIndex]) || defaultItem
        }

        for (let index = 0; index < sliced.length; index++) {
          defaultList[index] = sliced[index]
        }

        return defaultList
      }
    },

    methods: {
      getGalleryItem (guid) {
        return this.gallery.find(item => item.guid === guid)
      },
      forwardGallery (options = {}) {
        this.$router.push({ ...options, path: `/gallery/${this.$route.params.id}` })
      },
      addFirstPhoto () {
        this.forwardGallery({ query: { openUpload: true } })
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .gallery-empty {
    & p {
      margin-bottom: var(--base-gap);
    }
  }

  .gallery-list {
    list-style: none;
    display: flex;
    justify-content: space-between;
    margin-top: var(--base-gap);
    border-radius: var(--border-radius);
    overflow: hidden;
    --preview-size: calc(25vw - var(--base-gap) + 5px);

    & li {
      width: var(--preview-size);
      height: var(--preview-size);
    }

    & li > div {
      width: 100%;
      height: 100%;
      background: var(--grey);
    }

    & .gallery-item-empty {
      display: flex;
      justify-content: center;
      align-items: center;

      & svg {
        width: 65% !important;
        height: auto !important;
        opacity: 0.12;
      }
    }
  }
</style>
