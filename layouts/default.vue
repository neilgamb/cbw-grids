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
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
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
      clipped: false,
      drawer: false,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Inspire',
          to: '/inspire'
        },
        {
          icon: 'person',
          title: 'Account',
          to: '/login'
        }
      ],
      title: 'Vuetify.js',
      user: null,
      events: null
    }
  },
  mounted() {
    this.getEvents()
    this.user = this.$auth
    this.$auth.logout()
  },
  methods: {
    login() {
      // this.$auth.loginWith('google')
      // this.$auth.logout()
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
