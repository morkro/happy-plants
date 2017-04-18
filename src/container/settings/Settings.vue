<template>
  <main>
    <header class="page-header">
      <back-button />
      <h1>Settings</h1>
    </header>

    <section>
      export data<br />
      show scientific name instead<br />
    </section>
  </main>
</template>

<script>
  import BackButton from '@/components/BackButton'

  export default {
    name: 'Settings',
    components: {
      'back-button': BackButton
    }
  }
</script>
