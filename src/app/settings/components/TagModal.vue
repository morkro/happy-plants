<template>
  <app-dialog
    id="settings-tags-dialog"
    app-root=".settings-tags"
    :show="show"
    @close-dialog="emitCloseDialog">
    <span slot="headline">Edit tag</span>

    <form class="dialog-content">
      <label for="dialog-name">
        <h2>Name</h2>
        <input
          id="dialog-name"
          type="text"
          :value="tagLabel"
          @change="updateLabelName">
      </label>

      <v-button :loading="loading" @click.native="updateTag">
        Update name
      </v-button>
    </form>
  </app-dialog>
</template>

<script>
  import HappyDialog from '@/components/HappyDialog'
  import Button from '@/components/Button'
  export default {
    name: 'TagModal',

    props: {
      show: { type: Boolean, default: false },
      tag: { type: Object, default: () => {} },
      tagNames: { type: Array, default: () => [] },
      loading: { type: Boolean, default: false }
    },

    components: {
      'app-dialog': HappyDialog,
      'v-button': Button
    },

    data: () => ({
      newLabelName: ''
    }),

    computed: {
      tagLabel () {
        return this.tag && this.tag.label
          ? this.tag.label
          : ''
      }
    },

    methods: {
      updateLabelName (event) {
        if (!event.target.value) return
        this.newLabelName = event.target.value
      },
      emitCloseDialog () {
        Object.assign(this.$data, this.$options.data()) // Reset state
        this.$emit('close-dialog')
      },
      updateTag () {
        const data = {
          ...this.tag,
          label: this.newLabelName === ''
            ? this.tag.label
            : this.newLabelName
        }

        if (this.tagNames.includes(this.newLabelName)) {
          return this.$emit('content-error', data)
        }

        this.$emit('content-update', data)
        this.emitCloseDialog()
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .dialog-content {
    border-top: 3px solid rgba(0, 0, 0, 0.06);
    padding-top: var(--base-gap);
  }

  label {
    display: block;
    margin-bottom: calc(var(--base-gap) * 2);

    & h2 {
      margin-bottom: var(--base-gap);
    }

    & span {
      display: block;
      color: var(--text-color-secondary);
      font-size: var(--text-size-small);
      margin-bottom: var(--base-gap);
      padding: 0 1px;
    }

    & input {
      width: 100%;
    }
  }
</style>
