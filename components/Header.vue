<template>
  <v-toolbar
    clipped-left
    fixed
    app
    flat
  >
    <v-toolbar-side-icon @click="handleDrawerToggle" />
    <v-toolbar-title>CBW Grids</v-toolbar-title>
    <v-spacer />
    <v-toolbar-items style="position: absolute; right: -5px">
      <v-btn v-if="!loggedIn" flat @click="login">
        Sign In
        <v-icon right dark>
          person
        </v-icon>
      </v-btn>
      <v-btn v-if="loggedIn" flat to="profile">
        <span class="hidden-md-and-down" style="margin-right: 15px">Welcome, {{ this.$auth.user.given_name }}</span>
        <v-avatar size="35">
          <img :src="profilePic">
        </v-avatar>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ open: 'general/drawer' }),
    loggedIn() {
      return this.$auth.loggedIn
    },
    profilePic() {
      return this.$auth.loggedIn && this.$auth.user.picture
    }
  },
  methods: {
    ...mapActions({
      openDrawer: 'general/openDrawer',
      closeDrawer: 'general/closeDrawer'
    }),
    handleDrawerToggle() {
      const { open } = this
      open ? this.closeDrawer() : this.openDrawer()
    },
    login() {
      this.$auth.loginWith('google')
    }
  }
}
</script>
