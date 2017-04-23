<template>
  <main>
    <app-header :back="true">
      <h1 slot="title">Settings</h1>
    </app-header>

    <section>
      export data<br />
      show scientific name instead<br />
    </section>
  </main>
</template>

<script>
  import AppHeader from '@/components/AppHeader'

  export default {
    name: 'Settings',
    components: {
      'app-header': AppHeader
    }
  }
</script>
