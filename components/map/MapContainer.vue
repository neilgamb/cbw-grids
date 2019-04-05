<template>
  <div id="mapView" />
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { mapStyles } from '../../assets/mapStyles'

export default {
  name: 'MapContainer',
  data() {
    return {
      map: null,
      markers: [],
      eventsForMap: []
    }
  },
  computed: {
    // ...mapGetters(['general/currentDay', 'currentPeriod', 'venues', 'events', 'dates'])
    ...mapGetters({
      currentDay: 'general/currentDay',
      currentPeriod: 'general/currentPeriod',
      venues: 'grid/venues',
      events: 'grid/events',
      dates: 'general/dates',
      favorites: 'general/favorites'
    })
  },
  watch: {
    currentDay: function () {
      this.getEventsForMap()
    },
    currentPeriod: function () {
      this.getEventsForMap()
    },
    venues: function () {
      this.getEventsForMap()
    },
    events: function () {
      this.getEventsForMap()
    },
    eventsForMap: function () {
      this.deleteMarkers()
      this.updateMarkers()
      this.setMapOnAll(this.map)
    }
  },
  mounted() {
    this.mapInit()
    this.getEventsForMap()
  },
  methods: {
    mapInit() {
      const google = window.google
      const newOrleans = { lat: 29.935464, lng: -90.095124 }
      /* eslint-disable no-unused-vars */
      const map = new google.maps.Map(
        document.getElementById('mapView'), {
          zoom: 12,
          center: newOrleans,
          styles: mapStyles,
          disableDefaultUI: true
        }
      )
      this.map = map
    },
    getEventsForMap() {
      const { currentDay, dates, events, venues, favorites } = this
      const currentDate = dates[currentDay].date
      const eventsForMap = []
      if (!venues.length) return null

      events.map((e) => {
        let eventDate = new Date(e.event.date)

        e.event.venueInfo = venues.find(v => v.venue.id === e.event.venue).venue

        if (eventDate.getHours() < 12) {
          eventDate = moment(eventDate).subtract(1, 'days')
        }

        if (
          moment(eventDate).isSame(currentDate, 'day') &&
          favorites.some(fav => fav === e._id)
        ) {
          eventsForMap.push(e.event)
        }
      })

      this.eventsForMap = eventsForMap
    },
    deleteMarkers() {
      this.setMapOnAll(null)
      this.markers = []
    },
    setMapOnAll(map) {
      const { markers } = this
      markers.map(marker => marker.setMap(map))
    },
    addMarker(eventLocation, event) {
      const content = `
        <div id="content">
          <h3>${event.band}</h3>
          <div>${event.venueInfo.name} // ${moment(event.date).format('h:mm a')}</div>
          <div><a href="${event.tix}" target="_blank">Tickets: $${event.price}</a></div>
        </div>
      `

      const infoWindow = new window.google.maps.InfoWindow({
        content: content
      })

      const marker = new window.google.maps.Marker({
        position: eventLocation,
        animation: window.google.maps.Animation.DROP,
        map: this.map
      })
      marker.addListener('click', () => infoWindow.open(this.map, marker))
      this.markers.push(marker)
    },
    updateMarkers() {
      const { eventsForMap } = this
      const google = window.google

      eventsForMap.map((event) => {
        const { lat, lng } = event.venueInfo.geometry.location
        const eventLocation = new google.maps.LatLng(lat, lng)
        this.addMarker(eventLocation, event)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#mapView {
  height: 100%;
  width: 100%;
  color: black;
}
</style>
