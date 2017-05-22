<template>
  <section>
    <h1>Notes</h1>
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
  }

  textarea {
    border: none;
    width: 100%;
    max-width: 100vw;
    height: 100%;
    min-height: 150px;
  }
</style>
