<template>
  <div :class="['viewmode-container', 'box', { 'filter-view': tags.length }]">
    <div :class="['viewmode-section', section.type]"
      v-for="(section, index) in settings"
      :key="index">
      <h2>{{ section.title }}</h2>
      <ul class="viewmode-select">
        <li
          v-for="(item, index) in section.options"
          :class="{ selected: item.selected }"
          :key="index">
          <label :for="item.type">
            <div>
              <input
                type="radio"
                :id="item.type"
                :name="section.type"
                :value="item.type"
                :checked="item.selected"
                @click="emitViewmodeUpdate(section.type, item.type)">
              <span>{{ item.label }}</span>
            </div>

            <component
              :is="`feather-${item.icon}`"
              width="16"
              height="16" />
          </label>
        </li>
      </ul>
    </div>

    <div class="viewmode-filter" v-if="tags.length">
      <h2>Filter by tags</h2>

      <ul class="viewmode-select">
        <li>
          <label for="show-all">
            <input
              type="radio"
              name="viewmode-filter-tag"
              id="show-all"
              value="show-all"
              :checked="filterBy === 'all'"
              @change="emitViewmodeUpdate('filterBy', 'all')">
            <span>Show All</span>
          </label>
        </li>

        <li v-for="(tag, index) in tags" :key="index">
          <label :for="tag.name">
            <input
              type="radio"
              name="viewmode-filter-tag"
              :id="tag.name"
              :value="tag.name"
              :checked="isCheckedTag(tag.guid)"
              @change="emitViewmodeUpdate('filterBy', tag.guid)">
            <span>{{ tag.label }}</span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ViewmodeMenu',

    components: {
      'feather-grid': () =>
        import('vue-feather-icon/components/grid' /* webpackChunkName: "overview" */),
      'feather-list': () =>
        import('vue-feather-icon/components/list' /* webpackChunkName: "overview" */),
      'feather-layers': () =>
        import('vue-feather-icon/components/layers' /* webpackChunkName: "overview" */),
      'feather-hash': () =>
        import('vue-feather-icon/components/hash' /* webpackChunkName: "overview" */),
      'feather-bold': () =>
        import('vue-feather-icon/components/bold' /* webpackChunkName: "overview" */),
      'feather-clock': () =>
        import('vue-feather-icon/components/clock' /* webpackChunkName: "overview" */)
    },

    props: {
      viewMode: { type: String, default: '' },
      orderBy: { type: String, default: '' },
      filterBy: { type: String, default: 'all' },
      tags: { type: Array, default: () => [] }
    },

    data () {
      return {
        settings: [
          {
            title: 'View mode',
            type: 'viewMode',
            options: [
              {
                type: 'grid',
                icon: 'grid',
                label: 'Grid',
                selected: this.viewMode === 'grid'
              },
              {
                type: 'list',
                icon: 'list',
                label: 'List',
                selected: this.viewMode === 'list'
              }
            ]
          },
          {
            title: 'Order by',
            type: 'orderBy',
            options: [
              {
                type: 'latest',
                icon: 'clock',
                label: 'Latest',
                selected: this.orderBy === 'latest'
              },
              {
                type: 'alphabetical',
                icon: 'bold',
                label: 'Alphabet',
                selected: this.orderBy === 'alphabetical'
              }
            ]
          }
        ]
      }
    },

    methods: {
      isCheckedTag (guid) {
        return this.filterBy !== 'all' && this.filterBy === guid
      },
      emitViewmodeUpdate (section, type) {
        this.$emit('update-mode', { section, type })
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .viewmode-container {
    width: 100%;
    max-height: 35vh;
    display: flex;
    flex-wrap: wrap;

    &.filter-view {
      display: grid;
      grid-template-areas:
        "viewmode filter"
        "orderby filter";
      grid-template-columns: 50% 50%;
      grid-template-rows: auto 1fr;
    }

    & h2 {
      margin-bottom: var(--base-gap);
    }
  }

  .viewmode-section {
    width: 50%;
    flex: 0 1 auto;
    padding: var(--base-gap);
    text-align: left;

    &:not(:nth-of-type(even)) {
      border-right: 4px solid var(--grey);
    }

    @nest .filter-view & {
      border: none;
      width: 100%;
    }

    @nest .filter-view &.viewMode {
      grid-area: viewmode;
    }

    @nest .filter-view &.orderBy {
      grid-area: orderby;
    }
  }

  .viewmode-select {
    list-style: none;

    & li:not(:last-child) {
      margin-bottom: calc(var(--base-gap) / 1.5);
    }

    & label {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    & label > div {
      display: flex;
      align-items: center;
    }

    & input {
      margin-right: calc(var(--base-gap) / 2);
    }

    & input:checked + span {
      font-weight: 600;
      color: var(--brand-green);
    }
  }

  .viewmode-filter {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    background: var(--background-secondary);
    grid-area: filter;
    padding: var(--base-gap);
    text-align: left;

    & label {
      justify-content: flex-start;
    }
  }
</style>
