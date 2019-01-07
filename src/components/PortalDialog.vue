<template>
  <div v-if="show && activeDialog === dialogName">
    <portal to="dialog-title">
      <slot name="headline" />
    </portal>

    <portal to="dialog-content">
      <slot />
    </portal>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'PortalDialog',

    props: {
      dialogName: { type: String, default: '' },
      show: { type: Boolean, default: false },
      type: { type: String, default: 'normal' }
    },

    computed: mapState({
      activeDialog: state => state.dialog.active
    }),

    watch: {
      show (value) {
        this.toggleDialog({
          dialog: value ? this.dialogName : null,
          type: this.type
        })
      },

      activeDialog (dialog) {
        if (!dialog) {
          this.$emit('close-dialog')
        }
      }
    },

    methods: mapActions(['toggleDialog'])
  }
</script>
