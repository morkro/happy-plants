<template>
  <app-dialog id="dialog-tags" :show="show" @close-dialog="onCloseDialog">
    <template v-slot:headline>Select tags</template>

    <div :class="['dialog-tags-content', !tags.loaded && 'loading']">
      <feather-loader v-if="!tags.loaded" />

      <v-text
        v-else-if="tags.loaded && tags.data.length === 0"
        color="inactive"
      >You haven't created any tags yet.</v-text>

      <div v-else class="dialog-tags-list">
        <v-tag
          v-for="tag in tags.data"
          :key="tag.guid"
          :selected="!!selected.find(t => t.guid === tag.guid)"
          :tag="tag"
          @tag-selected="toggleSelectedTag"
        >{{ tag.label }}</v-tag>
      </div>

      <form class="dialog-tags-form" @submit.prevent="addNewTag">
        <v-input type="text" required v-model="newTagName" placeholder="Create new tag" />
        <div class="dialog-tags-form-submit">
          <v-button type="submit" round>
            <feather-plus />
            <span class="visuallyhidden">Add new tag</span>
          </v-button>
        </div>
      </form>
    </div>
  </app-dialog>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { TagsState } from '@/modules/tags/store/state'
  import { PlantTag } from '@/types/plant'

  export default Vue.extend({
    name: 'TagsDialog',
    props: {
      show: { type: Boolean, default: false },
      tags: { type: Object as PropType<TagsState>, default: false },
      preselected: { type: Array as PropType<PlantTag[]>, default: [] },
    },
    components: {
      'feather-plus': () =>
        import('vue-feather-icons/icons/PlusIcon' /* webpackChunkName: "icons" */),
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */),
    },
    data() {
      return {
        newTagName: null,
        selected: this.preselected,
      }
    },
    methods: {
      addNewTag() {
        this.$emit('create-tag', this.newTagName)
        this.newTagName = null
      },
      toggleSelectedTag(payload: { selected: string; tag: PlantTag }) {
        if (payload.selected) {
          this.selected.push(payload.tag)
        } else {
          this.selected = this.selected.filter((tag) => tag.guid !== payload.tag.guid)
        }
        this.$emit('tags-selected', this.selected)
      },
      onCloseDialog() {
        this.selected = []
        this.$emit('close-dialog')
      },
    },
    beforeUpdate() {
      this.selected = this.preselected
    },
  })
</script>

<style lang="postcss">
  .dialog-tags-content {
    & > .text {
      margin-bottom: calc(2 * var(--base-gap));
    }
  }

  .dialog-tags-content.loading {
    color: var(--brand-beige-dark);

    & > svg {
      display: block;
      animation: spin 3s linear infinite;
      margin: calc(2 * var(--base-gap)) auto;
    }
  }

  .dialog-tags-list {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: calc(0.5 * var(--base-gap));

    & .plant-tag {
      margin-bottom: calc(0.5 * var(--base-gap));
    }

    & > .plant-tag:not(:last-of-type) {
      margin-right: calc(0.5 * var(--base-gap));
    }
  }

  .dialog-tags-form {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: var(--base-gap);

    & .dialog-tags-form-submit {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
