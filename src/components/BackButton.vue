<template>
  <router-link :to="backPath" class="link-wrapper">
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path d="M0 12l9-8v6h15v4h-15v6z" />
    </svg>
  </router-link>
</template>

<script>
  export default {
    name: 'BackButton',
    props: ['path'],
    data () {
      return {
        backPath: this.path || '/'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .link-wrapper {
    display: flex;
    width: 22px;
    height: 22px;

    svg {
      width: 100%;
      height: 100%;
      fill: black;
    }
  }
</style>
