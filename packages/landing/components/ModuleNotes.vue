<template>
  <plant-component>
    <template v-slot:icon>
      <feather-book />
    </template>

    <template v-slot:title>
      <h2>Notebook</h2>
    </template>

    <template v-slot:content>
      <div v-if="!content"
           key="notes-empty"
           class="notes-empty"
      >
        <p>Seems like you haven't added any notes yet.</p>
        <v-button @click.native="toggleNotes">
          Add notes
        </v-button>
      </div>

      <div v-else
           key="notes-available"
           :class="{ 'notes-available': true, 'show-all': showAllNotes }"
      >
        <div class="notes-preview">
          <p>{{ content }}</p>
        </div>
        <div class="notes-actions">
          <v-button>
            <span v-if="!showAllNotes">Show all</span>
            <span v-else>Hide all</span>
          </v-button>
          <v-button v-if="!showAllNotes">
            Edit notes
          </v-button>
        </div>
      </div>
    </template>
  </plant-component>
</template>

<script>
  import { BookIcon } from 'vue-feather-icons'
  import ModuleComponent from './ModuleComponent'
  export default {
    name: 'PlantNotes',

    components: {
      'plant-component': ModuleComponent,
      'feather-book': BookIcon
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
        textContent: this.content,
        showAllNotes: false
      }
    },

    methods: {
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
  }

  textarea {
    --form-color: var(--light-grey);
    border: none;
    width: 100%;
    height: 45vh;
    padding: var(--base-gap);
    background: var(--form-color);
    border-radius: var(--border-radius);
    color: var(--text-color-base);
  }

  .notes-available,
  .notes-empty {
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 100%;

    &.show-all {
      display: block;
    }
  }

  .notes-empty {
    & p {
      width: 100%;
      margin-right: var(--base-gap);
      flex: 1;
    }

    button {
      flex: 1;
    }
  }

  .notes-preview {
    background: var(--light-grey);
    border-radius: var(--border-radius);
    padding: var(--base-gap);
    font-style: italic;
    width: 100%;
    flex: 1;
    margin-right: var(--base-gap);
    position: relative;

    @nest .show-all &::after {
      display: none;
    }

    &::after {
      display: block;
      content: "";
      width: 100%;
      height: calc(3 * var(--base-gap));
      background: linear-gradient(180deg, transparent, var(--background-secondary) 60%);
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: var(--border-radius);
    }

    & p {
      max-height: 16vh;
      overflow: hidden;
      width: 100%;
    }

    @nest .show-all & p::before {
      display: block;
      content: "";
      width: 110px;
      height: 55px;
      float: right;
      margin-top: calc(-1 * var(--base-gap));
      margin-right: calc(-1 * var(--base-gap));
    }
  }

  .notes-actions {
    display: flex;
    flex-direction: column;

    @nest .show-all & {
      position: absolute;
      right: 0;
      top: 0;
    }

    & button {
      justify-content: center;
    }

    & button:first-of-type {
      margin-bottom: var(--base-gap);
    }
  }
</style>
