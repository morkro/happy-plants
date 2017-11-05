<template>
  <main class="main-wireframe">
    <app-header :back="true">
      <h1 slot="title">Oops! Not found</h1>
    </app-header>
  </main>
</template>

<script>
  import AppHeader from '@/components/AppHeader'

  export default {
    name: 'NotFound',

    components: {
      'app-header': AppHeader
    }
  }
</script>

<style lang="scss" scoped></style>
