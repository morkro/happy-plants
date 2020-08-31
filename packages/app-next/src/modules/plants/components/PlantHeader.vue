<template>
  <header :class="['plant-header', photo && 'has-photo', loading && 'loading']">
    <div v-if="!loading" :class="['plant-header-label', canEditName && 'edit']" @click="editName">
      <v-text
        type="subtitle"
        :color="photo ? 'special' : 'normal'"
        @blur.native="updateName"
        :contenteditable="canEditName"
        ref="headerName"
      >
        <span>{{ name }}</span>
      </v-text>
    </div>

    <div class="plant-header-bg" @click="uploadNewPhoto">
      <feather-loader v-if="loading" class="plant-header-icon" />
      <lazy-image v-else-if="!loading && photo" :src="photo" :alt="name" :title="name" />
      <feather-camera v-else class="plant-header-icon" />

      <file-upload ref="headerFile" id="plant-header-file" @file-selected="getFile" />
    </div>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { HTMLElementEvent } from '@/types/events'

  export default Vue.extend({
    name: 'PlantHeader',
    props: {
      name: { type: String },
      photo: { type: String },
      loading: { type: Boolean, default: true },
    },
    components: {
      'feather-camera': () =>
        import('vue-feather-icons/icons/CameraOffIcon' /* webpackChunkName: "icons" */),
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */),
    },
    data() {
      return {
        canEditName: false,
        triggerUpload: false,
      }
    },
    methods: {
      uploadNewPhoto() {
        this.triggerUpload = true
        // Really hoping this can be done better in future.
        ;(this.$refs.headerFile as Vue & { triggerUpload: () => void }).triggerUpload()
      },
      async editName() {
        this.canEditName = true
        await Vue.nextTick()
        ;(this.$refs.headerName as HTMLHeadingElement).focus()
      },
      updateName(event: HTMLElementEvent<HTMLHeadingElement>) {
        this.canEditName = false
        if (event.target?.textContent) {
          const newName = event.target.textContent.trim().replace(/\s\s+/g, ' ')
          if (newName !== this.name) {
            this.$emit('update-name', newName)
          }
        }
      },
      getFile(file: File) {
        console.log(file)
      },
    },
  })
</script>

<style lang="postcss" scoped>
  @import '../../../styles/media-queries.css';

  .plant-header {
    width: 100%;
    height: 100vw;
    background: var(--brand-white);
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    position: relative;
    mask: url(../assets/header-mask.svg);
    mask-size: cover;

    &.loading {
      justify-content: center;
      align-items: center;
    }

    @media (--max-mobile-viewport) {
      height: var(--app-max-width);
    }

    &.loading .plant-header-icon {
      animation: spin 3s linear infinite;
    }

    &.loading::before {
      content: '';
      width: 60%;
      height: 20px;
      display: block;
      background: var(--brand-beige);
      border-radius: var(--base-radius);
      position: absolute;
      bottom: var(--base-gap);
      left: var(--base-gap);
    }
  }

  .plant-header-label {
    width: 100%;
    padding: var(--base-gap);
    position: relative;
    z-index: 1;

    &.edit {
      background: var(--brand-black-50);
    }

    @nest .has-photo & {
      background-image: linear-gradient(
        to bottom,
        hsla(0, 0%, 0%, 0) 0%,
        hsla(0, 0%, 0%, 0) 0.5%,
        hsla(0, 0%, 0%, 0.002) 1.9%,
        hsla(0, 0%, 0%, 0.008) 4.2%,
        hsla(0, 0%, 0%, 0.019) 7.4%,
        hsla(0, 0%, 0%, 0.037) 11.5%,
        hsla(0, 0%, 0%, 0.064) 16.5%,
        hsla(0, 0%, 0%, 0.102) 22.4%,
        hsla(0, 0%, 0%, 0.152) 29.1%,
        hsla(0, 0%, 0%, 0.216) 36.7%,
        hsla(0, 0%, 0%, 0.296) 45.2%,
        hsla(0, 0%, 0%, 0.394) 54.5%,
        hsla(0, 0%, 0%, 0.512) 64.6%,
        hsla(0, 0%, 0%, 0.651) 75.6%,
        hsla(0, 0%, 0%, 0.813) 87.4%,
        hsl(0, 0%, 0%) 100%
      );
    }
  }

  .plant-header-bg {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    & .fileupload {
      position: absolute;
      left: 0;
      transform: translateX(-100%);
      height: 0;
      opacity: 0;
    }
  }

  .plant-header-icon {
    width: 80px;
    height: 80px;
    stroke: var(--brand-beige);
  }
</style>
