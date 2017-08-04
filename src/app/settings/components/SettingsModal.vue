<template>
  <app-modal :show="show" @close-modal="emitCloseModal">
    <h1 slot="headline">Import data to Happy Plants</h1>
    <div slot="content">
      To be implemented.
    </div>
  </app-modal>
</template>

<script>
  import Modal from '@/app/shared/Modal'

  export default {
    name: 'SettingsModal',

    components: {
      'app-modal': Modal
    },

    props: {
      show: { type: Boolean, default: false }
    },

    methods: {
      emitCloseModal () {
        this.$emit('close-modal')
      }
    }
  }
</script>

<style lang="scss" scoped></style>
