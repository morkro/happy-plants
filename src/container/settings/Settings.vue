<template>
  <main class="main-wireframe">
    <app-header :back="true">
      <h1 slot="title">Settings</h1>
    </app-header>

    <section>
      <div class="settings-data">
        <button @click="downloadData">download data</button>
        <button @click="importData">import data</button>
      </div>
    </section>
  </main>
</template>

<script>
  import AppHeader from '@/components/AppHeader'
  import downloadJSON from '@/utils/downloadJSON'

  export default {
    name: 'Settings',
    components: {
      'app-header': AppHeader
    },
    methods: {
      downloadData () {
        this.$localforage.keys()
          .then(keys => Promise.all(keys.map(k => this.$localforage.getItem(k))))
          .then(downloadJSON)
      },
      importData () {
        // TODO: Implement import logic with `<input type="file" />`
        console.log('import')
      }
    }
  }
</script>

<style lang="scss" scoped></style>
