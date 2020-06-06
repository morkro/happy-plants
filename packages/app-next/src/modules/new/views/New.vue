<template>
  <div class="screen-addplant">
    <app-header color="white">Add a new friend</app-header>

    <main>
      <form class="addplant-form">
        <label-group
          id="addplant-name"
          label="What's your friends name? *"
          :error="error.el === 'name' && error.message"
        >
          <template v-slot="{ label }">
            <v-input
              required
              type="text"
              placeholder="e.g. Echeveria pulvinata"
              id="addplant-name"
              v-model="name"
              :aria-describedby="label"
              :aria-invalid="error.el === 'name'"
              :error="error.el === 'name'"
              :error-message="error.message"
            />
          </template>
        </label-group>

        <label-group
          id="addplant-photo"
          label="Do you want to upload a photo?"
          :error="error.el === 'photo' && error.message"
        >
          <template v-slot="{ label }">
            <file-upload id="addplant-photo" @file-selected="getFile" :aria-describedby="label" />
          </template>
        </label-group>

        <v-button color="yellow">Add friend</v-button>
      </form>

      <new-illustration />
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Illustration from '../components/Illustration.vue'

  export default Vue.extend({
    name: 'New',
    components: {
      'new-illustration': Illustration,
    },
    data() {
      return {
        name: null,
        error: { el: null, message: null },
      }
    },
    methods: {
      getFile(file: File) {
        console.log(file)
      },
    },
  })
</script>

<style lang="postcss" scoped>
  .screen-addplant {
    width: 100%;
    display: flex;
    flex-direction: column;

    & #app-header {
      background: var(--brand-green);
    }

    & main {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: var(--brand-green);
      position: relative;

      & .new-illustration-bg {
        position: absolute;
        z-index: 0;
        bottom: 0;
      }
    }
  }

  .addplant-form {
    width: 100%;
    height: 100%;
    padding: 0 var(--base-gap) var(--base-gap);
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 1;

    & button {
      width: 100%;
    }
  }
</style>
