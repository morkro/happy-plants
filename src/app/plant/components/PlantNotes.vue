<template>
  <plant-component>
    <feather-book slot="icon" />
    <h2 slot="title">Notebook</h2>
    <div slot="content">
      <app-dialog :show="showNotes" @close-dialog="closeNotes">
        <h1 slot="headline">Notebook</h1>

        <div slot="content">
          <textarea
            @change="updateContent"
            :value="content" />
        </div>

        <button
          slot="cancel"
          class="plain"
          @click="closeNotes">
          Cancel
        </button>
        <button slot="confirm" @click="closeAndSaveNotes">
          Save
        </button>
      </app-dialog>

      <div v-if="!content" key="notes-empty">
        <p>Seems like you haven't added any notes yet.</p>
        <button @click="toggleNotes">Add notes</button>
      </div>
      <div v-else key="notes-available">
        <button @click="toggleNotes">Show notes</button>
      </div>
    </div>
  </plant-component>
</template>

<script>
  import Dialog from '@/components/Dialog'
  import PlantComponent from './PlantComponent'
  export default {
    name: 'PlantNotes',

    components: {
      'app-dialog': Dialog,
      'plant-component': PlantComponent,
      'feather-book': () =>
        import('vue-feather-icon/components/book' /* webpackChunkName: "plant" */)
    },

    props: {
      content: {
        type: String,
        default: 'Add your notes here!'
      }
    },

    data () {
      return {
        showNotes: false,
        textContent: this.content
      }
    },

    methods: {
      toggleNotes () {
        this.showNotes = !this.showNotes
      },
      closeNotes () {
        this.showNotes = false
      },
      closeAndSaveNotes () {
        this.closeNotes()
        this.emitContentChange()
      },
      updateContent (event) {
        if (!event.target.value) return
        this.textContent = event.target.value
      },
      emitContentChange () {
        this.$emit('update-plant', {
          type: 'notes',
          payload: { notes: this.textContent }
        })
      }
    }
  }
</script>

<style lang="postcss" scoped>
  p {
    color: var(--text-color-secondary);
    margin-bottom: var(--base-gap);
  }

  textarea {
    border: none;
    width: 80vw;
    height: 45vh;
    padding: var(--base-gap);
    background: var(--light-grey);
    border-radius: var(--border-radius);
  }
</style>
