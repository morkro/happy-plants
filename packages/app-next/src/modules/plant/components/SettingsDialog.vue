<template>
  <app-dialog id="dialog-settings" :show="show" @close-dialog="$emit('close-dialog')">
    <template v-slot:headline>Settings</template>

    <template>
      <v-button
        color="red"
        :class="['remove-plant-btn', progress && 'progress']"
        @click.native="deletePlant"
      >
        <feather-loader v-if="progress" />
        <feather-trash v-else />
        <span>Delete plant</span>
      </v-button>

      <div class="dialog-settings-modified">
        <v-text
          small
          color="inactive"
        >Last modified {{ plant.modified | formatDate }} {{ modifiedTime }}</v-text>
      </div>
    </template>
  </app-dialog>
</template>

<script lang="ts">
  import Vue, { VueConstructor, PropType } from 'vue'
  import { mapState, mapActions } from 'vuex'
  import logger from '@/utils/vueLogger'
  import { deletePlant, deleteFile, getStoragePath } from '@/services/firebase'
  import { RootState } from '@/store'
  import { Plant } from '@/types/plant'
  import delay from '@/utils/promiseDelay'
  import { toReadableTime } from '../../../services/dayjs'

  interface SettingsMapState {
    userID: string
  }

  export default (Vue as VueConstructor<Vue & SettingsMapState>).extend({
    name: 'SettingsDialog',
    props: {
      show: { type: Boolean, default: false },
      plant: { type: Object as PropType<Plant> },
    },
    components: {
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */),
      'feather-trash': () =>
        import('vue-feather-icons/icons/TrashIcon' /* webpackChunkName: "icons" */),
    },
    data() {
      return {
        progress: false,
      }
    },
    computed: {
      ...mapState<RootState>({
        userID: (state: RootState) => state.user.uid,
      }),
      modifiedTime(): string {
        return toReadableTime(this.plant.modified)
      },
    },
    methods: {
      ...mapActions({ showNotification: 'notifications/show' }),
      async deletePlant() {
        try {
          this.progress = true

          await deletePlant(this.userID, this.plant)
          this.$store.commit('home/removePlant', this.plant)

          if (this.plant.imageURL) {
            await deleteFile(getStoragePath(this.userID, this.plant.guid))
          }

          await delay(2000)

          this.progress = false
          this.$router.push('/home')
        } catch (error) {
          logger(error.message, true)
          this.showNotification({
            type: 'alert',
            message: 'Unable to delete plant. Please try again later.',
          })
        } finally {
          if (this.progress) {
            this.progress = false
          }
        }
      },
    },
  })
</script>

<style lang="postcss">
  .remove-plant-btn {
    width: 100%;

    &.progress svg {
      animation: spin 3s linear infinite;
    }
  }

  .dialog-settings-modified {
    width: 100%;
    padding-top: var(--base-gap);
    text-align: center;
  }
</style>
