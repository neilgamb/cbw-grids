<template>
  <v-app dark>
    <Header />
    <Drawer />
    <v-content fluid fill-height>
      <nuxt />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import VenueService from '../server/services/VenueService'
import EventService from '../server/services/EventService'
import Header from '../components/Header'
import Drawer from '../components/Drawer'
import Footer from '../components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Drawer,
    Footer
  },
  data() {
    return {
      user: null,
      events: null,
      venues: null
    }
  },
  mounted() {
    this.getEvents()
    this.getVenues()
    this.user = this.$auth
  },
  methods: {
    async getEvents() {
      try {
        const events = await EventService.getEvents()
        this.events = events
      } catch (error) {
      }
    },
    async getVenues() {
      try {
        const venues = await VenueService.getVenues()
        this.venues = venues
      } catch (error) {
      }
    }
  }
}
</script>
