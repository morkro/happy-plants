<template>
  <app-modal
    :show="show"
    @close-modal="emitCloseModal">
    <h1 slot="headline">Edit category</h1>

    <form slot="content" class="modal-content" @submit.prevent="updateCategory">
      <label for="modal-name">
        <h2>Name</h2>
        <input
          id="modal-name"
          type="text"
          :placeholder="categoryLabel"
          v-model="newLabelName" />
      </label>

      <button>Update name</button>
    </form>
  </app-modal>
</template>

<script>
  import Modal from '@/components/Modal'
  export default {
    name: 'CategoryModal',

    props: {
      show: { type: Boolean, default: false },
      category: { type: Object, default: () => {} }
    },

    components: {
      'app-modal': Modal
    },

    data: () => ({
      newLabelName: ''
    }),

    computed: {
      categoryLabel () {
        return this.category && this.category.label
          ? this.category.label
          : ''
      }
    },

    methods: {
      emitCloseModal () {
        Object.assign(this.$data, this.$options.data()) // Reset state
        this.$emit('close-modal')
      },
      updateCategory () {
        const data = { ...this.category, label: this.newLabelName }
        this.$emit('content-update', data)
        this.emitCloseModal()
      }
    }
  }
</script>

<style lang="scss" scoped></style>
