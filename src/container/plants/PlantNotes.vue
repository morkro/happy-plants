<template>
  <section>
    <h1>Notes</h1>
    <button @click="emitClose">close</button>
    <textarea @change="emitContentChange">{{ content.notes }}</textarea>
  </section>
</template>

<script>
  export default {
    name: 'PlantNotes',
    props: {
      content: { type: [Object, Boolean], default: () => ({}) }
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
  section {
    background: yellow;
    width: 100%;
    position: fixed;
    top: 50%;
    z-index: 1;
    transform: translateY(-50%);
    height: 45vh;
  }

  textarea {
    border: none;
    width: 100%;
    max-width: 100vw;
    height: 100%;
    min-height: 150px;
  }
</style>
