<template>
  <div class="overview-menu">
    <ul class="menu-left">
      <li v-if="showViewmode">
        <button
          aria-label="View mode"
          class="view-mode icon inverse"
          @click.prevent="emitMenuAction('view-mode')">
          <feather-grid width="18" height="18" />
        </button>
      </li>
      <li v-if="showCategories">
        <button
          aria-label="Categorise"
          class="categorise icon inverse"
          @click.prevent="emitMenuAction('category')">
          <feather-layers width="18" height="18" />
        </button>
      </li>
    </ul>

    <router-link
      tag="button"
      aria-label="Add plant"
      class="add-plant"
      :to="{ path: 'add' }">
      <svgicon icon="leaf" width="20" height="28" color="#000" />
    </router-link>

    <ul class="menu-right">
      <li v-if="showDelete">
        <button
          aria-label="Trash"
          class="delete icon inverse"
          @click.prevent="emitMenuAction('delete')">
          <feather-trash width="18" height="18" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  import '@/assets/leaf'

  export default {
    name: 'OverviewMenu',

    components: {
      'feather-trash': () =>
        import('vue-feather-icon/components/trash-2' /* webpackChunkName: "overview" */),
      'feather-grid': () =>
        import('vue-feather-icon/components/grid' /* webpackChunkName: "overview" */),
      'feather-layers': () =>
        import('vue-feather-icon/components/layers' /* webpackChunkName: "overview" */)
    },

    props: {
      showDelete: { type: Boolean, default: true },
      showViewmode: { type: Boolean, default: false },
      showCategories: { type: Boolean, default: true }
    },

    methods: {
      emitMenuAction (type) {
        this.$emit('clicked-item', type)
      }
    }
  }
</script>

<style lang="scss" scoped>
  $menu-size: 45px;

  .overview-menu {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: $menu-size;

    ul {
      list-style: none;
    }

    li,
    li button {
      width: $menu-size;
      height: $menu-size;
    }

    ul li button {
      display: flex;
      justify-content: center;

      svg {
        margin-right: 0;
      }
    }
  }

  .menu-left,
  .menu-right {
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
  }

  .menu-left {
    justify-content: flex-start;
  }

  .menu-right {
    justify-content: flex-end;
  }

  .add-plant {
    box-shadow: none;
    height: $menu-size;
    width: $menu-size;
    padding: 0;
    justify-content: center;

    svg {
      margin: 0;
    }
  }
</style>
