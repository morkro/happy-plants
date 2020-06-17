<template>
  <v-layout class="screen-plant">
    <app-header return-to="/home">
      {{ ' ' }}
      <template #actions>
        <div class="plant-header-actions">
          <v-button round small @click.native="toggleDialog(true)">
            <span class="visuallyhidden">Open settings</span>
            <feather-more />
          </v-button>
        </div>
      </template>
    </app-header>

    <settings-dialog :show="showSettingsDialog" :plant="plant" @close-dialog="toggleDialog(false)" />

    <main>
      <div v-if="loading">
        <v-text>loading</v-text>
      </div>
      <v-text v-else>{{ plant.name }}</v-text>
      <div style="height: 110vh;background:var(--brand-white);">
        really long content
        <router-link :to="`${$route.path}/gallery`">Gallery</router-link>
      </div>
    </main>
  </v-layout>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { Plant } from '@/types/plant'
  import hasProperty from '@/utils/hasProperty'
  import SettingsDialog from '../components/SettingsDialog.vue'

  export default Vue.extend({
    name: 'Plant',
    props: {
      plant: {
        type: Object as PropType<Plant>,
      },
      loading: {
        type: Boolean,
      },
    },
    components: {
      'settings-dialog': SettingsDialog,
      'feather-more': () =>
        import('vue-feather-icons/icons/MoreVerticalIcon' /* webpackChunkName: "icons" */),
    },
    data() {
      return {
        showSettingsDialog: hasProperty(this.$route.query, 'settings'),
      }
    },
    methods: {
      toggleDialog(show: boolean) {
        this.showSettingsDialog = show

        if (show) {
          this.$router.push({ path: this.$route.path, query: { settings: null } })
        } else {
          this.$router.push(this.$route.path)
        }
      },
    },
  })
</script>

<style lang="postcss">
  .screen-plant #app-header {
    & .plant-header-actions {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 var(--base-gap);
    }
  }
</style>
