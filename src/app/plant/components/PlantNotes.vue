<template>
  <section>
    <header>
      <h1>Notes</h1>
      <button @click="emitClose" class="circle">✕</button>
    </header>
    <textarea @change="emitContentChange">{{ content }}</textarea>
  </section>
</template>

<script>
  export default {
    name: 'PlantNotes',

    props: {
      content: {
        type: String,
        default: () => ({})
      }
    },

    methods: {
      emitClose () {
        this.$emit('close-notes')
      },
      emitContentChange (event) {
        this.$emit('update-notes', event.srcElement.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/variables";

  section {
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
  }

  header {
    padding: $base-gap;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      color: $text-color-inverse;
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
</style>
