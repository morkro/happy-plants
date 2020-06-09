<template>
  <div class="home-view-options">
    <section>
      <v-text type="subtitle">Viewmode</v-text>
      <ul>
        <li>
          <label for="viewmode-grid">
            <v-input
              type="radio"
              id="viewmode-grid"
              name="viewmode"
              value="grid"
              :checked="viewmode === 'grid'"
              @click.native="updateViewmode('grid')"
            />
            <v-text>Grid</v-text>
          </label>
        </li>
        <li>
          <label for="viewmode-list">
            <v-input
              type="radio"
              id="viewmode-list"
              name="viewmode"
              value="list"
              :checked="viewmode === 'list'"
              @click.native="updateViewmode('list')"
            />
            <v-text>List</v-text>
          </label>
        </li>
      </ul>
      <v-text type="subtitle">Order by</v-text>
      <ul>
        <li>
          <label for="orderby-latest">
            <v-input
              type="radio"
              id="orderby-latest"
              name="orderby"
              value="latest"
              :checked="orderBy === 'latest'"
              @click.native="updateOrderBy('latest')"
            />
            <v-text>Latest</v-text>
          </label>
        </li>
        <li>
          <label for="orderby-alphabetically">
            <v-input
              type="radio"
              id="orderby-alphabetically"
              name="orderby"
              value="alphabetically"
              :checked="orderBy === 'alphabetically'"
              @click.native="updateOrderBy('alphabetically')"
            />
            <v-text>Alphabetically</v-text>
          </label>
        </li>
      </ul>
    </section>
    <section :class="['home-view-options-tags', loading && 'loading']">
      <v-text type="subtitle">Filter by tags</v-text>
      <div>
        <feather-loader v-if="loading" />
        <ul v-else>
          <li>
            <label for="filterby-all">
              <v-input
                type="radio"
                id="filterby-all"
                name="tags"
                value="filterby-all"
                checked
                @click.native="updateTag(null)"
              />
              <v-text>All</v-text>
            </label>
          </li>
          <li v-for="tag of tags" :key="tag.name">
            <label :for="tag.name">
              <v-input
                type="radio"
                :id="tag.name"
                name="tags"
                :value="tag.name"
                :checked="filterBy === tag.guid"
                @click.native="updateTag(tag)"
              />
              <v-text>{{ tag.label }}</v-text>
            </label>
          </li>
        </ul>
      </div>
    </section>

    <svg
      class="home-view-options-bg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 360 32"
      aria-hidden="true"
    >
      <path
        fill="#FFF"
        fill-rule="evenodd"
        d="M202.13 18.156c.386 3.896.201 1.481.035 6.35-.034 1.002-.48 1.648-1.32 1.98-7.018 2.764-32.58 5.9-39.062 4.755-.876-2.465-1.016-5.159-.422-7.188 1.09-.84 0 .117 21.717-2.63 10.732-1.358 14.256-2.554 16.625-3.093.701-.16 1.395-.545 2.426-.174zM360 0v10.245c-3.864 3.4-10.353 1.537-26.979.121-102.7-8.747-132.682 15.276-244.46 8.368-75.47-4.665-51.996-2.844-76.452-6.022l.09-.354C7.145 11.283 2.97 10.646 0 9.73L.002 0h360z"
      />
    </svg>
  </div>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { HomeViewmode, HomeOrderBy } from '../index'
  import { PlantTag } from '@/types/tags'
  export default Vue.extend({
    name: 'ViewOptions',
    props: {
      viewmode: { type: String },
      orderBy: { type: String },
      filterBy: { type: String },
      tags: { type: Array as PropType<PlantTag[]> },
      loading: { type: Boolean, default: true },
    },
    components: {
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */),
    },
    methods: {
      updateViewmode(type: HomeViewmode): void {
        this.$emit('update-viewmode', type)
      },
      updateOrderBy(type: HomeOrderBy): void {
        this.$emit('update-orderby', type)
      },
      updateTag(tag: PlantTag): void {
        this.$emit('update-tag', tag)
      },
    },
  })
</script>

<style lang="postcss">
  .home-view-options {
    position: fixed;
    z-index: 1;
    top: 0;
    background: var(--brand-white);
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    padding-top: var(--app-header-height);

    & section {
      padding: var(--base-gap) var(--base-gap) 0;
      position: relative;

      &:first-of-type {
        border-right: 4px solid var(--brand-beige);
      }

      &::after {
        content: '';
        position: absolute;
        z-index: 10;
        right: 0;
        bottom: 0;
        background: var(--brand-beige);
        border-radius: var(--base-radius);
        height: 4px;
        width: 4px;
        transform: translate(4px, 11px);
      }
    }

    & ul {
      list-style: none;
      width: 100%;
      padding: var(--base-gap) 0;

      & li:not(:last-child) {
        padding-bottom: calc(0.5 * var(--base-gap));
      }

      & label {
        width: 100%;
        display: flex;
        align-items: center;
      }

      & input {
        margin-right: calc(0.5 * var(--base-gap));
      }
    }

    & .home-view-options-bg {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      transform: translateY(100%);
    }
  }

  .home-view-options-tags {
    &.loading > div {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--brand-beige-dark);
    }

    & > div {
      width: 100%;
      height: 170px;
      overflow: scroll;

      & svg {
        animation: spin 3s linear infinite;
      }
    }
  }
</style>
