<template>
  <main class="main-wireframe">
    <app-header :back="true">
      <h1 slot="title">Settings</h1>
    </app-header>

    <div class="settings-content">
      <section class="settings-data">
        <h2>Data</h2>
        <div class="data-actions">
          <button @click="downloadData">Download</button>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
  import { mapActions } from 'vuex'
  import AppHeader from '@/app/shared/AppHeader'

  export default {
    name: 'Settings',

    components: {
      'app-header': AppHeader
    },

    methods: {
      ...mapActions([
        'getAllPlants'
      ]),
      triggerDownload (data = { message: 'No data!' }) {
        const dataString = JSON.stringify(data, null, 2)
        const $a = document.createElement('a')

        $a.download = `happy-plants-${Date.now()}.json`
        $a.href = window.URL.createObjectURL(new Blob([dataString], { type: 'text/json' }))
        $a.dataset.downloadurl = ['text/json', $a.download, $a.href].join(':')

        $a.dispatchEvent(new MouseEvent('click', { view: window }))
      },
      downloadData () {
        this.getAllPlants()
          .then(this.triggerDownload)
      },
      importData (data) {
        this.importData(data)
          .then(/* show notification */)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";

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
