<template>
  <div class="viewmode-container box">
    <div class="viewmode-section" v-for="(section, index) in settings" :key="index">
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
                @click="emitViewmodeUpdate(section.type, item.type)" />
              <span>{{ item.label }}</span>
            </div>

            <component :is="`feather-${item.icon}`" width="16" heigth="16" />
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
      'feather-layers': () =>
          import('vue-feather-icon/components/layers' /* webpackChunkName: "overview" */),
      'feather-bold': () =>
          import('vue-feather-icon/components/bold' /* webpackChunkName: "overview" */),
      'feather-clock': () =>
          import('vue-feather-icon/components/clock' /* webpackChunkName: "overview" */)
    },

    props: {
      viewMode: { type: String },
      orderBy: { type: String }
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
                type: 'categories',
                icon: 'layers',
                label: 'Category',
                selected: this.viewMode === 'categories'
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
                label: 'Date',
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
  }

  .viewmode-section {
    width: 50%;
    flex: 1;
    padding: var(--base-gap);
    text-align: left;

    &:first-of-type {
      border-right: 2px solid var(--grey);
    }

    &:last-of-type {
      border-left: 2px solid var(--grey);
    }

    & h2 {
      margin-bottom: var(--base-gap);
    }
  }

  .viewmode-select {
    list-style: none;

    & li:not(:last-child) {
      margin-bottom: calc(var(--base-gap) / 2);
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
