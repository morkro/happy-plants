<template>
  <section>
    <span>
      Download all your application data as JSON file or
      import another data file to add to your collection.
    </span>
    <div class="data-actions">
      <button @click="downloadData">Download</button>
      <button @click="openSettingsModal">Import</button>
    </div>
  </section>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'SettingsData',

    data () {
      return {
        showSettingsModal: false
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
      openSettingsModal () {
        this.showSettingsModal = true
      },
      closeSettingsModal () {
        this.showSettingsModal = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/layout";

  section {
    padding: $base-gap;
    line-height: 150%;

    span {
      display: inline-block;
      margin-bottom: $base-gap;
    }

    .data-actions {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
