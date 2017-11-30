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
          :value="categoryLabel"
          @change="updateLabelName" />
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
      category: { type: Object, default: () => {} },
      categoryNames: { type: Array, default: [] }
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
      updateLabelName (event) {
        if (!event.target.value) return
        this.newLabelName = event.target.value
      },
      emitCloseModal () {
        Object.assign(this.$data, this.$options.data()) // Reset state
        this.$emit('close-modal')
      },
      updateCategory () {
        const data = { ...this.category, label: this.newLabelName }

        if (this.categoryNames.includes(this.newLabelName)) {
          return this.$emit('content-error', data)
        }

        this.$emit('content-update', data)
        this.emitCloseModal()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .modal-content {
    border-top: 3px solid rgba(0, 0, 0, 0.06);
    padding-top: var(--base-gap);
  }

  label {
    display: block;
    margin-bottom: calc(var(--base-gap) * 2);

    h2 {
      margin-bottom: var(--base-gap);
    }

    span {
      display: block;
      color: var(--text-color-secondary);
      font-size: var(--text-size-small);
      margin-bottom: var(--base-gap);
      padding: 0 1px;
    }

    input {
      width: 100%;
    }
  }
</style>
