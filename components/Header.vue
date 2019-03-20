<template>
  <v-toolbar
    clipped-left
    fixed
    app
  >
    <v-toolbar-side-icon @click="handleDrawerToggle" />
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ open: 'general/drawer' })
  },
  methods: {
    ...mapActions({
      openDrawer: 'general/openDrawer',
      closeDrawer: 'general/closeDrawer'
    }),
    handleDrawerToggle() {
      const { open } = this
      open ? this.closeDrawer() : this.openDrawer()
    }
  }
}
</script>
