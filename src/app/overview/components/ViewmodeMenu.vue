<template>
  <div class="viewmode-container box">
    <div class="viewmode-section"
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
      orderBy: { type: String, default: '' }
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
      emitViewmodeUpdate (section, type) {
        this.$emit('update', { section, type })
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .viewmode-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .viewmode-section {
    width: 50%;
    flex: 0 1 auto;
    padding: var(--base-gap);
    text-align: left;

    &:not(:nth-of-type(even)) {
      border-right: 4px solid var(--grey);
    }

    & h2 {
      margin-bottom: var(--base-gap);
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
</style>
