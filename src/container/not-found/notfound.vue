<template>
  <main class="main-wireframe">
    <app-header :back="true" :settings="true">
      <h1 slot="title">Oops!</h1>
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
