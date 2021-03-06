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
      currentPeriod: 'general/currentPeriod',
      venues: 'grid/venues',
      events: 'grid/events',
      favorites: 'general/favorites',
      grid: 'grid/grid',
      loading: 'general/loading'
    })
  },
  watch: {
    events: function () {
      this.buildGrid()
    },
    currentPeriod: function () {
      this.buildGrid()
    },
    favorites: async function (val) {
      if (this.$auth.$state.loggedIn) {
        // find user
        const users = await UserService.getUsers()
        const user = users.find(e => e.user.sub === this.$auth.$state.user.sub)

        const favorites = []
        val.map(fav => favorites.push(fav))

        UserService.updateUser(user._id, favorites)
      }
    },
    $route() {
      if (
        this.$route.name === 'profile' ||
        this.$route.name === 'index'
      ) this.buildGrid()
    }
  },
  mounted() {
    this.enableLoader()
    this.getEvents()
    this.getVenues()
    this.userValidate()
  },
  methods: {
    ...mapActions({
      setEvents: 'grid/setEvents',
      setVenues: 'grid/setVenues',
      setGrid: 'grid/setGrid',
      setFavorites: 'general/setFavorites',
      enableLoader: 'general/enableLoader',
      disableLoader: 'general/disableLoader'
    }),
    async getEvents() {
      try {
        const events = await EventService.getEvents()
        this.setEvents(events)
      } catch (error) {
        console.log(error) // eslint-disable-line
      }
    },
    async getVenues() {
      try {
        this.enableLoader()
        const venues = await VenueService.getVenues()
        this.setVenues(venues)
        this.disableLoader()
        this.buildGrid()
      } catch (error) {
        console.log(error) // eslint-disable-line
      }
    },
    sortEvents(events) {
      return events.sort((a, b) => {
        return new Date(a.event.date) - new Date(b.event.date)
      })
    },
    buildGrid() {
      const { dates, events, venues, favorites } = this
      const onMyGrids = this.$auth.loggedIn && this.$route.name === 'profile'
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
              moment(eventDate).isSame(date.date, 'day') &&
              (onMyGrids ? favorites.some(fav => fav === event._id) : true)
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
    async userValidate() {
      if (this.$auth.$state.loggedIn) {
        const users = await UserService.getUsers()
        const existsInDB = users.find(e => e.user.sub === this.$auth.$state.user.sub)

        if (existsInDB) {
          // user already in DB, load user's favorites into state
          this.setFavorites(existsInDB.user.favorites)
        } else if (!existsInDB) {
          // user not in DB yet, add to DB
          const user = {
            ...this.$auth.$state.user,
            favorites: []
          }
          await UserService.insertUser(user)
        }
      }
    }
  }
}
</script>
