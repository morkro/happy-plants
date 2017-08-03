<template>
  <section>
    <app-modal :show="showNotes" @close-modal="closeNotes">
      <h1 slot="headline">Notebook</h1>
      <div slot="content">
        <textarea @change="emitContentChange" v-model="textContent"></textarea>
      </div>
    </app-modal>

    <header>
      <h2>Notebook</h2>
      <div v-if="!content">
        <p>Seems like you haven't added any notes yet.</p>
        <button @click="toggleNotes">Add notes</button>
      </div>
      <div v-else>
        <button @click="toggleNotes">Show notes</button>
      </div>
    </header>
  </section>
</template>

<script>
  import Modal from '@/app/shared/Modal'
  export default {
    name: 'PlantNotes',

    props: {
      content: {
        type: String,
        default: 'Add your notes here!'
      }
    },

    components: {
      'app-modal': Modal
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
        this.emitContentChange()
      },
      emitContentChange () {
        this.$emit('update-notes', this.textContent)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/layout";
  @import "~styles/colors";
  @import "~styles/z-index";

  section {
    h2, p {
      margin-bottom: $base-gap;
    }
  }

  textarea {
    border: none;
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 85px);
    padding: $base-gap;
  }
</style>
