<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      mini-variant
      clipped
      fixed
      app
    >
      <v-list>
        <v-list-tile
          to="/"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          to="/inspire"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>code</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Inspire</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          to="/login"
          router
          exact
          @click="logout"
        >
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      clipped-left
      fixed
      app
    >
      <v-toolbar-side-icon @click="drawer = !drawer" />
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      fixed
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
// import VenueService from "../server/services/VenueService";
import EventService from '../server/services/EventService'

export default {
  name: 'CouldBeWorseGrids',
  data() {
    return {
      drawer: false,
      user: null,
      events: null
    }
  },
  mounted() {
    this.getEvents()
    this.user = this.$auth
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
    async getEvents() {
      try {
        const events = await EventService.getEvents()
        this.events = events
        // console.log(events)
      } catch (error) {
        // console.log(error)
      }
    }
  }
}
</script>
