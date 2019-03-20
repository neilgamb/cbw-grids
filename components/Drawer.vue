<template>
  <v-navigation-drawer
    v-model="drawer"
    clipped
    fixed
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
      <v-list-tile to="/profile" router exact>
        <v-list-tile-action>
          <v-icon>person</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Profile</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="logout">
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
    logout() {
      this.$auth.logout()
    }
  }
}
</script>
