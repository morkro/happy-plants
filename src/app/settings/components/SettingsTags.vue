<template>
  <div class="settings-tags">
    <!-- Modal for editing tags. -->
    <tag-modal
      :show="showModal"
      :tag="selectedTag"
      :tag-names="tags.map(c => c.label)"
      @content-update="editTagLabel"
      @content-error="showTagUpdateError"
      @close-dialog="closeModal" />

    <!-- Alert as confirmation to delete tag. -->
    <tag-dialog
      id="settings-tags-delete"
      app-root=".settings-tags"
      type="danger"
      :show="showDialog"
      @close-dialog="closeDialog">
      <span slot="headline">Delete tag</span>

      <div>
        <p>
          Do you really want to delete <span class="tag">{{ selectedTagLabel }}</span>?
          This will remove it from all plants!
        </p>

        <button type="button"
          class="warning"
          @click="confirmDeleteTag">
          Delete tag
        </button>
      </div>
    </tag-dialog>

    <div :class="{ 'no-tags': !tags.length, 'app-content': true }">
      <div v-if="!tags.length" class="tags-empty">
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

      <section class="tags-list" v-else>
        <ul>
          <li v-for="(tag, index) in tags" :key="`tag-${index}`">
            <tag-item
              :label="tag.label"
              :count="tag.plants.length" />

            <div class="tags-actions">
              <button type="button"
                class="icon inverse edit"
                aria-label="Edit tag"
                @click="openTagModal(tag)">
                <feather-edit />
              </button>
              <button type="button"
                class="icon inverse delete"
                aria-label="Delete tag"
                @click="openTagDialog($event, tag)">
                <feather-trash />
              </button>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import HappyDialog from '@/components/HappyDialog'
  import TagModal from './TagModal'
  import TagItem from './TagItem'

  export default {
    name: 'SettingsTags',

    meta: {
      title: 'Manage Tags'
    },

    components: {
      'tag-dialog': HappyDialog,
      'tag-modal': TagModal,
      'tag-item': TagItem,
      'feather-plus': () =>
        import('vue-feather-icon/components/plus' /* webpackChunkName: "settings" */),
      'feather-edit': () =>
        import('vue-feather-icon/components/edit-2' /* webpackChunkName: "settings" */),
      'feather-hash': () =>
        import('vue-feather-icon/components/hash' /* webpackChunkName: "settings" */),
      'feather-trash': () =>
        import('vue-feather-icon/components/trash' /* webpackChunkName: "settings" */)
    },

    data: () => ({
      showModal: false,
      showDialog: false,
      tagName: '',
      selectedTag: null
    }),

    computed: {
      ...mapState({
        tags: state => state.tags,
        plants: state => state.plants
      }),
      hasTagName () {
        return this.tagName !== ''
      },
      selectedTagLabel () {
        return this.selectedTag && this.selectedTag.label
          ? this.selectedTag.label
          : ''
      }
    },

    created () {
      this.updateAppHeader({
        title: 'Manage tags',
        backBtn: true,
        settingsBtn: false
      })
    },

    methods: {
      ...mapActions([
        'deleteTag',
        'updateTag',
        'showNotification',
        'updateAppHeader'
      ]),
      closeModal () {
        this.showModal = false
        this.selectedTag = null
      },
      closeDialog () {
        this.showDialog = false
        this.selectedTag = null
      },
      showTagUpdateError (tag) {
        this.showNotification({
          message: `A tag with name "${tag.label}" already exists.`
        })
      },
      editTagLabel (tag) {
        this.updateTag(tag)
          .then(() => this.showNotification({ message: `Updated tag.` }))
      },
      openTagModal (tag) {
        this.selectedTag = tag
        this.showModal = true
      },
      openTagDialog (event, tag) {
        this.selectedTag = tag
        this.showDialog = true

        if (event.currentTarget) {
          event.currentTarget.blur()
        }
      },
      confirmDeleteTag () {
        const { label, guid } = this.selectedTag
        // 1. Delete tag
        this.deleteTag({ tag: guid, forceDelete: true })
          // 2. Close alert
          .then(() => this.closeDialog())
          // 3. Show notification
          .then(() =>
            this.showNotification({
              message: `Tag "${label}" deleted.`
            }))
      }
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

  .tag-empty {
    padding: 0 var(--base-gap);
    color: var(--text-color-secondary);
    text-align: center;
    font-weight: 600;
  }

  .tags-list ul {
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

    & svg {
      margin: 0;
    }
  }

  .tags-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: var(--base-gap);

    & button {
      background: var(--grey);
      border-radius: 50%;
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;

      &:hover,
      &:focus {
        --button-focus: transparent;
        background: var(--brand-green);
      }

      &:hover svg,
      &:focus svg {
        filter: invert(100%);
      }
    }

    & button:first-of-type {
      margin-right: var(--base-gap);
    }

    & button.edit svg {
      transform: translateY(-1px);
    }

    & button.delete svg {
      transform: translateX(-1px) translateY(-1px);
    }
  }
</style>
