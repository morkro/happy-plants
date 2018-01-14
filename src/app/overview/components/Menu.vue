<template>
  <div :class="wrapperClass">
    <ul class="menu-left">
      <li v-if="showViewmode">
        <button
          aria-label="View mode"
          :class="`view-mode icon ${disableMenu ? '' : 'inverse'}`"
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
      :to="{ path: 'add' }"
      :event="disableMenu ? '' : 'click'">
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
      noElements: { type: Boolean, default: false },
      showDelete: { type: Boolean, default: true },
      showViewmode: { type: Boolean, default: true },
      showCategories: { type: Boolean, default: false },
      disableMenu: { type: Boolean, default: false }
    },

    computed: {
      wrapperClass () {
        return {
          'overview-menu': true,
          'box': true,
          'single': this.noElements,
          'disabled': this.disableMenu
        }
      }
    },

    methods: {
      emitMenuAction (type) {
        if (this.disableMenu) return
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

    &.single {
      width: $menu-size;
      margin: 0 auto;
    }

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

    .single & {
      display: none;
    }

    .disabled & li button:not(.view-mode) {
      opacity: 0.3;
    }

    .disabled & li .view-mode {
      background: var(--brand-green);
    }
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

    .disabled & {
      background: var(--grey);
    }

    svg {
      margin: 0;
    }
  }
</style>
