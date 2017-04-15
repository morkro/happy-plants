<template>
  <main>
    <header class="page-header">
      <h1>Settings</h1>
      <router-link :to="{ path: '/' }">
        <button>Back to overview</button>
      </router-link>
    </header>

    <section>
      export data<br />
      show scientific name instead<br />
    </section>
  </main>
</template>

<script>
  export default {
    name: 'Settings'
  }
</script>
