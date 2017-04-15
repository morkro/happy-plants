<template>
  <router-link :to="{ path: `plant/${guid}` }" class="plant-preview">
    <div class="preview-content">
      <h1>{{ name }}</h1>
      <span>{{ scientific }}</span>
    </div>
    <img :src="imageURL" :alt="name" />
  </router-link>
</template>

<script>
  export default {
    name: 'PlantPreview',
    props: ['guid', 'name', 'scientific', 'imageURL']
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

  .preview-content {
    position: absolute;
    color: white;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 10px;
    font-size: $text-size-small;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, .5));

    h1 {
      color: white;
      font-size: $text-size-base;
    }
  }
</style>
