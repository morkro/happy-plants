<template>
  <div>
    <v-box class="intro-storage">
      <h2>How do you want to save your plant data?</h2>
      <p>
        You can change this at any time in the settings later on.
      </p>
      <ul>
        <li v-for="(type, index) of options" :key="index">
          <v-input
            type="radio"
            name="storage-type"
            :checked="selectedStorageType === type.id"
            :id="type.id"
            @change="updateStorageMethod(type.id)" />
          <label :for="type.id">
            <span class="storage-title">
              <component
                :is="`feather-${type.icon}`"
                height="22"
                width="22" />
              {{ type.label }}
            </span>
            <span class="storage-description">
              {{ type.description }}
            </span>
          </label>
        </li>
      </ul>
    </v-box>

    <div class="intro-footer">
      <v-button color="plain" @click.native="$router.back()">
        <template v-slot:icon>
          <feather-left />
        </template>
        <span>Back</span>
      </v-button>
      <v-button @click.native="evalNextStep">
        <template v-slot:icon>
          <feather-right />
        </template>
        <span>Next</span>
      </v-button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'IntroStorage',

    components: {
      'feather-right': () =>
        import('vue-feather-icons/icons/ArrowRightIcon' /* webpackChunkName: "icons" */),
      'feather-left': () =>
        import('vue-feather-icons/icons/ArrowLeftIcon' /* webpackChunkName: "icons" */),
      'feather-cloud': () =>
        import('vue-feather-icons/icons/CloudIcon' /* webpackChunkName: "icons" */),
      'feather-smartphone': () =>
        import('vue-feather-icons/icons/SmartphoneIcon' /* webpackChunkName: "icons" */)
    },

    computed: mapState({
      selectedStorageType: state => state.storage.type
    }),

    data: () => ({
      storageType: null,
      options: [
        {
          label: 'Locally on phone',
          icon: 'smartphone',
          description: 'This is the default option. All application data is stored on your device.',
          id: 'local'
        },
        {
          label: 'In the cloud',
          icon: 'cloud',
          description: `Stores your plant data in Google Firebase. You will be able to login from different devices. Required by some features.`,
          id: 'cloud'
        }
      ]
    }),

    methods: {
      ...mapActions([
        'updateAppHeader',
        'updateStorage',
        'signInUser'
      ]),
      updateStorageMethod (type) {
        this.storageType = type
      },
      evalNextStep () {
        let path = '/intro'

        switch (this.storageType) {
          case 'cloud':
            path += '/register'
            break
          case 'local':
          default:
            path += '/howto'
            break
        }

        this.$router.push(path)
      }
    },

    created () {
      this.updateAppHeader({
        title: 'Setup storage',
        transparent: false,
        backBtn: false,
        rightBtn: false
      })
    }
  }
</script>

<style lang="postcss" scoped>
  .intro-storage {
    padding: var(--base-gap);

    & p {
      margin-top: var(--base-gap);
    }

    & ul {
      margin-top: var(--double-gap);
      list-style: none;
    }

    & li {
      display: flex;
      align-items: flex-start;

      &:not(:last-child) {
        margin-bottom: var(--base-gap);
      }
    }

    & input {
      margin-right: var(--base-gap);
      flex: 0 0 auto;
    }

    & .storage-title {
      display: flex;
      align-items: center;

      & svg {
        margin-right: calc(var(--base-gap) / 2);
      }
    }

    & .storage-description {
      display: block;
      margin-top: calc(var(--base-gap) / 2);
      font-size: var(--text-size-small);
      color: var(--text-color-secondary);
    }
  }

  .intro-footer {
    margin-top: var(--double-gap);
    display: flex;
    justify-content: space-between;
  }
</style>
