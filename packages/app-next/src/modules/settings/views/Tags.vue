<template>
  <v-layout>
    <app-header return-to="/settings">Tags</app-header>

    <main>
      <div v-if="allTags.loaded">
        <v-tag v-for="tag of allTags.data" :key="tag.guid">{{ tag.label }}</v-tag>
      </div>
    </main>
  </v-layout>
</template>

<script lang="ts">
  import Vue, { VueConstructor } from 'vue'
  import { mapState, mapActions } from 'vuex'
  import { RootState } from '@/store'
  import { PlantTag } from '@/types/plant'

  interface TagsMapState {
    allTags: {
      data: PlantTag[]
      loaded: boolean
    }
  }

  export default (Vue as VueConstructor<Vue & TagsMapState>).extend({
    name: 'SettingsTags',
    computed: {
      ...mapState<RootState>({
        allTags: (state: RootState) => state.home.tags,
      }),
    },
    methods: {
      ...mapActions({ loadTags: 'home/loadTags' }),
    },
    async created() {
      if (!this.allTags.loaded) {
        await this.loadTags()
      }
    },
  })
</script>
