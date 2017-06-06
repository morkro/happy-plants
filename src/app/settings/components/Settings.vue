<template>
  <main class="main-wireframe">
    <app-header :back="true">
      <h1 slot="title">Settings</h1>
    </app-header>

    <div class="settings-content">
      <section class="settings-data">
        <h2>Data</h2>
        <div class="data-actions">
          <button @click="downloadData">Download plants data</button>
          <button @click="importData">Import data</button>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
  import AppHeader from '@/app/shared/AppHeader'

  export default {
    name: 'Settings',
    components: {
      'app-header': AppHeader
    },
    methods: {
      triggerDownload (data = { message: 'No data!' }) {
        const dataString = JSON.stringify(data, null, 2)
        const $a = document.createElement('a')

        $a.download = `happy-plants-${Date.now()}.json`
        $a.href = window.URL.createObjectURL(new Blob([dataString], { type: 'text/json' }))
        $a.dataset.downloadurl = ['text/json', $a.download, $a.href].join(':')

        $a.dispatchEvent(new MouseEvent('click', { view: window }))
      },
      downloadData () {
        this.$localforage.keys()
          .then(keys => Promise.all(keys.map(k => this.$localforage.getItem(k))))
          .then(this.triggerDownload)
      },
      importData () {
        // TODO: Implement import logic with `<input type="file" />`
        console.log('import')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/variables";

  main {
    min-height: 10vh;
    height: 100vh;
    background: $light-grey;
  }

  .settings-content {
    padding: $base-gap;

    section h2 {
      margin-bottom: $base-gap;
    }
  }

  .settings-data .data-actions {
    display: flex;
    justify-content: space-between;
  }
</style>
