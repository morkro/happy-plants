<template>
  <section>
    <app-modal
      class="danger-modal"
      backgroundColor="#ef494f"
      :show="showDangerModal"
      @close-modal="closeDangerModal">
      <h1 slot="headline">Deleting application data</h1>
      <div slot="content">
        <p>
          Be aware that once you've done this, your data <strong>cannot</strong> be restored!
          This permanently deletes all your plant (photos, collections, <em>everything</em>) data.
        </p>
        <button @click="deleteApplicationData">I understand, delete my data</button>
      </div>
    </app-modal>

    <span>
      Download all your application data as JSON file or
      import another data file to add to your collection.
    </span>
    <div class="data-actions">
      <button @click="downloadData">Download data</button>
      <button class="disabled" disabled>Import data</button>
    </div>
    <hr />
    <div class="danger-zone">
      <h2>Danger Zone</h2>
      <span>Delete your application data. Once you've deleted your data, there is no going back!</span>
      <button class="warning" @click="openDangerModal">Delete application data</button>
    </div>
  </section>
</template>

<script>
  import { mapActions } from 'vuex'
  import Modal from '@/components/Modal'

  export default {
    name: 'SettingsData',

    components: {
      'app-modal': Modal
    },

    data () {
      return {
        showDangerModal: false
      }
    },

    methods: {
      ...mapActions([
        'getAllPlants',
        'deleteAllPlants'
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
      openDangerModal () {
        this.showDangerModal = true
      },
      closeDangerModal () {
        this.showDangerModal = false
      },
      deleteApplicationData () {
        this.deleteAllPlants()
          .then(() => this.closeDangerModal())
          .then(() => this.$router.push('/'))
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
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

  hr {
    margin: $base-gap * 1.5 0 $base-gap 0;
    border: none;
    border-top: 3px solid $dark-transparency;
  }

  .danger-modal {
    h1, p {
      color: $text-color-inverse;
    }

    button {
      margin-top: $base-gap;
      display: block;
      background: $yellow;
      color: $link-color;
    }
  }
</style>
