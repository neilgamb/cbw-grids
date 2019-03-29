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
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import { getFestDay } from '../assets/helpers'
import VenueService from '../server/services/VenueService'
import EventService from '../server/services/EventService'
import UserService from '../server/services/UserService'
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
      users: null
    }
  },
  computed: {
    ...mapGetters({
      dates: 'general/dates',
      venues: 'grid/venues',
      events: 'grid/events'
    })
  },
  watch: {
    events: function () {
      this.buildGrid()
    }
  },
  mounted() {
    this.getEvents()
    this.getVenues()
    this.userValidate()
  },
  methods: {
    ...mapActions({
      setEvents: 'grid/setEvents',
      setVenues: 'grid/setVenues',
      setGrid: 'grid/setGrid'
    }),
    async getEvents() {
      try {
        const events = await EventService.getEvents()
        this.setEvents(events)
      } catch (error) {
      }
    },
    async getVenues() {
      try {
        const venues = await VenueService.getVenues()
        this.setVenues(venues)
        this.buildGrid()
      } catch (error) {
      }
    },
    sortEvents(events) {
      return events.sort((a, b) => {
        return new Date(a.event.date) - new Date(b.event.date)
      })
    },
    buildGrid() {
      const { dates, events, venues } = this
      const grid = []

      // for each venue...
      venues.map((venue) => {
        // loop through every date...
        dates.map((date) => {
          // create a unique 'grid item / block'
          const gridItem = {
            day: null,
            period: null,
            venue: venue,
            events: []
          }

          // loop through each event
          events.map((event) => {
            let eventDate = new Date(event.event.date)

            // first need to adjust for shows starting > 11:59pm
            if (eventDate.getHours() < 12) {
              eventDate = moment(eventDate).subtract(1, 'days')
            }

            // populate grid item based on date && venue
            if (
              event.event.venue === venue.venue.id &&
              moment(eventDate).isSame(date.date, 'day')
            ) {
              gridItem.events.push(event)
              gridItem.day = getFestDay(eventDate)
              gridItem.period = date.period
            }
          })

          if (gridItem.events && gridItem.events.length > 0) this.sortEvents(gridItem.events)

          if (gridItem.events.length && gridItem.events.length > 0) {
            grid.push(gridItem)
          }
        })
      })
      this.setGrid(grid)
    },
    async getUsers() {
      const users = await UserService.getUsers()
      this.users = users
    },
    async userValidate() {
      if (this.$auth.$state.loggedIn) {
        console.log('logged in, check to see if user in DB') // eslint-disable-line

        const users = await UserService.getUsers()

        if (users.some(e => e.sub === this.$auth.$state.user.sub)) {
          console.log('user already in DB, load favorited events') // eslint-disable-line
        } else {
          console.log('add user to DB', this.$auth.$state.user) // eslint-disable-line
          await UserService.insertUser(this.$auth.$state.user)
        }
      }
    }
  }
}
</script>
