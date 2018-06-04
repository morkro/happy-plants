<template>
  <header class="plant-header">
    <div v-if="editMode">
      yay edit that thang
    </div>

    <div class="plant-header-view" v-else>
      <div :class="{ 'is-skeleton': !name, 'no-photo': !imageUrl, 'header-content': true }">
        <v-touch tag="h1"
          @tap="updateTitle"
          :tap-options="{ taps: 2 }"
          :contenteditable="editTitle"
          @blur.native="emitTitleUpdate">
          {{ name }}
        </v-touch>
      </div>
      <div class="header-background">
        <img
          v-if="imageUrl"
          :src="imageUrl"
          :alt="name">
        <svgicon
          v-else
          icon="cactus"
          width="50"
          height="50"
          color="#000" />
      </div>
    </div>
  </header>
</template>

<script>
  import '@/assets/cactus'
  export default {
    name: 'PlantHeader',

    props: {
      name: { type: [String, Boolean], default: false },
      imageUrl: { type: [String, Boolean], default: false },
      editMode: { type: Boolean, default: false }
    },

    data: () => ({
      editTitle: false
    }),

    methods: {
      updateTitle () {
        this.editTitle = true
      },

      emitTitleUpdate (event) {
        this.editTitle = false
        if (event.target && event.target.textContent) {
          this.$emit(
            'update-name',
            event.target.textContent.trim().replace(/\s\s+/g, ' ')
          )
        }
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .plant-header {
    position: relative;
    color: var(--text-color-inverse);
    height: 100vw;
    background: var(--grey);
  }

  .plant-header-view {
    height: 100%;

    & h1 {
      padding: var(--base-gap);
      font-size: var(--text-size-large);
      font-weight: 600;
      color: var(--text-color-inverse);
      line-height: 115%;
      position: relative;

      &[contenteditable="true"] {
        outline: none;
        background: var(--transparency-black-medium);
        width: 100%;
      }
    }

    & .header-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      position: absolute;
      bottom: 0;
      width: 100%;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
      z-index: 1;

      &.no-photo {
        background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2));
      }
    }

    & img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    & .header-background {
      width: 100%;
      height: 100%;
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
