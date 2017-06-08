<template>
  <div @click="handleClick"
    :style="{ backgroundImage: `url(${imageURL})` }"
    :class="{
      'plant-preview': true,
      'no-photo': !this.imageURL,
      'select-delete': this.deleteMode && this.selected,
      'select': this.deleteMode
    }">
    <div class="preview-content">
      <div class="preview-headline">
        <h1>{{ name }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '@/router'

  export default {
    name: 'PlantPreview',

    props: ['deleteMode', 'guid', 'name', 'imageURL'],

    methods: {
      handleClick (event) {
        event.preventDefault()

        if (this.deleteMode) {
          this.toggleSelection()
          this.deleteElement()
          return
        }

        router.push(`plant/${this.guid}`)
      },
      deleteElement () {
        this.$emit('delete-plant', {
          guid: this.guid,
          selected: this.selected
        })
      },
      toggleSelection () {
        this.selected = !this.selected
      }
    },

    data () {
      return {
        selected: false
      }
    },

    updated () {
      if (!this.deleteMode) {
        this.selected = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/variables";

  .plant-preview {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: $border-radius;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    box-shadow: $shadow;
    transform-origin: center;
    transition: transform 50ms ease-in-out;

    &:before,
    &:after {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      border-radius: $border-radius;
      transition: opacity 100ms ease-in-out;
    }

    &:before {
      width: calc(100% - 4px);
      height: calc(100% - 4px);
      border: 2px dashed white;
      opacity: 0;
      z-index: 2;
    }

    &:after {
      opacity: 0;
      background: red;
      z-index: 1;
    }

    &.no-photo {
      // TODO: Show default image instead
      background: $grey;
    }

    &.select:before {
      opacity: 1;
    }

    &.select-delete {
      transform: scale(.95);

      &:after {
        opacity: .3
      }
    }
  }

  .preview-content {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .preview-headline {
    position: absolute;
    color: white;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 10px;
    font-size: $text-size-small;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    transition: opacity 100ms ease-in-out;

    &.inactive,
    &.inactive h1 {
      color: rgba(255, 255, 255, .75);
    }

    h1 {
      color: white;
      font-size: $text-size-base;
      font-weight: 600;
    }
  }
</style>
