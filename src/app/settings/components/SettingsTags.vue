<template>
  <div :class="{ 'settings-tags': true, 'no-tags': !allTags.length }">
    <div v-if="!allTags.length" class="tags-empty">
      <feather-hash />
      <h1>You haven't added tags to your plants yet</h1>
      <p>
        Tagging is a system to help organise your plants better.
        Head over to any of your plants and add a tag. After that,
        they will appear here and you can rename or delete them.
      </p>
      <router-link class="btn" to="/">
        Overview
      </router-link>
    </div>

    <ul v-else class="tags-list">
      <li v-for="tag in allTags" :key="tag.label">
        <tag-item :label="tag.label" :count="tag.count" />
        <div class="list-actions">
          <button
            class="icon inverse delete"
            aria-label="Delete category"
            @click="deleteTag($event, tag)">
            <feather-trash />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import TagItem from './TagItem'

  export default {
    name: 'SettingsTags',

    meta: {
      title: 'Manage tags'
    },

    components: {
      'tag-item': TagItem,
      'feather-hash': () =>
        import('vue-feather-icon/components/hash' /* webpackChunkName: "settings" */),
      'feather-trash': () =>
        import('vue-feather-icon/components/trash' /* webpackChunkName: "settings" */)
    },

    computed: {
      ...mapGetters({
        allTags: 'getAllTags'
      })
    },

    methods: {
      ...mapActions([
        'updateAppHeader'
      ]),
      deleteTag (event, tag) {
        console.log(tag)

        if (event.currentTarget) {
          event.currentTarget.blur()
        }
      }
    },

    created () {
      this.updateAppHeader({
        title: 'Manage Tags',
        backBtn: true,
        settingsBtn: false
      })
    }
  }
</script>

<style lang="postcss" scoped>
  .settings-tags {
    min-height: 100vh;
    background: var(--background-secondary);
  }

  .tags-empty {
    padding: calc(2 * var(--base-gap)) var(--base-gap);
    color: var(--text-color-secondary);
    display: flex;
    flex-direction: column;
    text-align: center;

    & svg {
      align-self: center;
      width: 10%;
      height: 10%;
      opacity: 0.25;
    }

    & h1 {
      margin: var(--base-gap) 0;
    }

    & a {
      margin-top: calc(2 * var(--base-gap));
      align-self: center;
    }
  }

  .tags-list {
    list-style: none;

    & li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--base-gap) calc(var(--base-gap) + 5px);
      font-size: var(--text-size-medium);

      &:not(:last-child) {
        border-bottom: 2px solid var(--transparency-black-light);
      }
    }
  }
</style>
