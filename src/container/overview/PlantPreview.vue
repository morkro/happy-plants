<template>
  <div :class="{ 'plant-preview': true, 'no-photo': !this.imageURL }"
    :style="{ backgroundImage: `url(${imageURL})` }">
    <button @click="deleteElement" class="preview-delete icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
        <path d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"/>
      </svg>
    </button>
    <div @click="handleClick" class="preview-content">
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
    props: ['configMode', 'guid', 'name', 'imageURL'],
    methods: {
      handleClick (event) {
        console.log(event.target)
        router.push(`plant/${this.guid}`)
      },
      deleteElement () {
        this.$emit('delete-plant', this.guid)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .plant-preview {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: $border-radius;
    overflow: hidden;
    background-size: cover;
    box-shadow: $shadow;

    &.no-photo {
      // TODO: Show default image instead
      background: $grey;
    }
  }

  .preview-delete {
    fill: white;
    position: absolute;
    padding: 10px;
    top: 0;
    right: 0;
    z-index: 1;
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
