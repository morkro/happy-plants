<template>
  <div @click="handleClick" class="plant-preview">
    <button v-if="configMode" @click="deleteElement" class="preview-delete icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
        <path d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"/>
      </svg>
    </button>
    <div :class="{ 'preview-content': true, inactive: configMode }">
      <h1>{{ name }}</h1>
      <span>{{ scientific }}</span>
    </div>
    <img :src="imageURL" :alt="name" />
  </div>
</template>

<script>
  import localforage from 'localforage'
  import router from '@/router'
  export default {
    name: 'PlantPreview',
    props: ['configMode', 'guid', 'name', 'scientific', 'imageURL'],
    methods: {
      handleClick () {
        if (this.configMode) return
        router.push(`plant/${this.guid}`)
      },
      deleteElement () {
        localforage.removeItem(`plant-${this.guid}`)
          .then(() => this.$forceUpdate())
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/variables";

  .plant-preview {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: $border-radius;
    overflow: hidden;

    img {
      object-fit: cover;
      width: 100%;
      min-height: 100%;
      height: auto;
    }
  }

  .preview-delete {
    fill: white;
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .preview-content {
    position: absolute;
    color: white;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 10px;
    font-size: $text-size-small;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, .5));

    &.inactive,
    &.inactive h1 {
      color: rgba(255, 255, 255, .75);
    }

    h1 {
      color: white;
      font-size: $text-size-base;
    }
  }
</style>
