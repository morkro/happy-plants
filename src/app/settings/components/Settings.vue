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
      <hr />
      <section class="settings-info">
        <p>
          Happy Plants is a progressive web application
          build with Vue.js and other great web technologies by
          <a href="http://moritz.berlin" target="_blank">Moritz Kröger</a>.
          <br /><br />
          The codebase is open source and availabe on <a href="https://github.com/morkro/happy-plants" target="_blank">GitHub</a>.
          Any contribution is very welcome!
        </p>
        <span class="info-version">Version: {{ version }}</span>
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

    data () {
      return {
        version: '0.1.0'
      }
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

    hr {
      border: none;
      border-top: 3px solid $dark-transparency;
      width: 100%;
      margin: $base-gap * 2 0;
    }

    section h2 {
      margin-bottom: $base-gap;
    }
  }

  .settings-data .data-actions {
    display: flex;
    justify-content: space-between;
  }

  .settings-info {
    p, span {
      color: $text-color-secondary;
      font-size: 90%;
    }

    a {
      color: $text-color-base;
    }

    .info-version {
      display: inline-block;
      margin-top: $base-gap;
      font-style: italic;
    }
  }
</style>
