<template>
  <v-navigation-drawer
    v-model="drawer"
    clipped
    fixed
    width="200"
    app
  >
    <v-list>
      <v-list-tile to="/" router exact>
        <v-list-tile-action>
          <v-icon>grid_on</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>The Gridz</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to="/map" router exact>
        <v-list-tile-action>
          <v-icon>public</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>The Map</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile v-if="loggedIn" to="/profile" router exact>
        <v-list-tile-action>
          <v-avatar size="35">
            <img :src="profilePic">
          </v-avatar>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>My Grids</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile v-if="!loggedIn" to="/profile" router exact @click="login">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Sign In</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile v-if="loggedIn" @click="logout">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
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
    },
    drawer: {
      get() {
        return this.open
      },
      set(open) {
        if (!open) this.closeDrawer()
      }
    }
  },
  methods: {
    ...mapActions({
      openDrawer: 'general/openDrawer',
      closeDrawer: 'general/closeDrawer'
    }),
    login() {
      this.$auth.loginWith('google')
    },
    logout() {
      this.$auth.logout()
    }
  }
}
</script>
