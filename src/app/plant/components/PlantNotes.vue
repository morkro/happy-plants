<template>
  <section>
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

    <section class="modal" v-if="showNotes">
      <header>
        <h2>Notebook</h2>
        <button @click="closeNotes" class="circle">✕</button>
      </header>
      <textarea @change="emitContentChange">{{ content }}</textarea>
    </section>
  </section>
</template>

<script>
  export default {
    name: 'PlantNotes',

    props: {
      content: {
        type: String,
        default: 'Add your notes here!'
      }
    },

    data () {
      return {
        showNotes: false
      }
    },

    methods: {
      toggleNotes () {
        this.showNotes = !this.showNotes
      },
      closeNotes () {
        this.showNotes = false
      },
      emitContentChange (event) {
        this.$emit('update-notes', event.srcElement.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/variables";

  section:not(.modal) {
    margin-bottom: 4px;

    h2,
    p {
      margin-bottom: $base-gap;
    }
  }

  .modal {
    background: rgba(0, 0, 0, .5);
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 1;
    height: 100vh;
    left: 0;
    padding-top: 50px;
    display: flex;
    flex-direction: column;

    header {
      padding: $base-gap;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 {
        color: $text-color-inverse;
        margin-bottom: 0;
      }

      button {
        height: 40px;
        width: 40px;
      }
    }

    textarea {
      border: none;
      width: 100%;
      height: 100%;
      padding: $base-gap;
    }
  }
</style>
