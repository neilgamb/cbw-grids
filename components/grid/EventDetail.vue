<template>
  <v-card color="#212121" class="eventDetailContainer">
    <div class="eventDetailHeader">
      <h1>{{ event.event.band }}</h1>
      <h2>{{ venue && venue.name }}</h2>
      <h2>{{ formatDate }}</h2>
    </div>

    <div id="map" />

    <v-card-actions class="eventDetailFooter">
      <v-spacer />
      <v-btn
        color="white"
        class="detailButton"
        outline
        large
        @click="closeEventDetail"
      >
        Close
      </v-btn>
      <v-btn
        color="white"
        class="detailButton"
        outline
        large
        @click.stop="openTixLink(event.event.tix)"
      >
        Tickets ${{ event.event.price }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from 'moment'
import { mapStyles } from '../../assets/mapStyles.js'

export default {
  name: 'EventDetail',
  props: {
    event: { type: Object, default: () => {} },
    venue: { type: Object, default: () => {} },
    closeEventDetail: { type: Function, default: () => {} }
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    isMobile() {
      return window.innerWidth < 1024
    },
    formatDate() {
      return `${moment(this.event.event.date).format('MMMM Do')} at ${moment(this.event.event.date).format('h:mm a')}`
    }
  },
  mounted() {
    this.mapInit()
  },
  methods: {
    mapInit() {
      const google = window.google
      const { lat, lng } = this.venue.geometry.location
      const venue = { lat: lat, lng: lng }
      /* eslint-disable no-unused-vars */
      const map = new google.maps.Map(
        document.getElementById('map'), {
          zoom: 16,
          center: venue,
          styles: mapStyles,
          disableDefaultUI: true
        }
      )

      const marker = new window.google.maps.Marker({
        position: venue,
        animation: window.google.maps.Animation.DROP,
        map: map
      })

      marker.setMap(map)
    },
    openTixLink(link) {
      window.open(link, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.eventDetailContainer {
  position: relative;
  height: 100vh;
  width: 100vw;

  .eventDetailHeader {
    position: absolute;
    top: 0;
    padding: 10px;
    z-index: 1;
    background: rgba(0, 0, 0, 0.75);
    width: 100%;
    border-bottom: 3px solid white;
  }

  #map {
    height: 100vh;
    width: 100vw;
  }

  .eventDetailFooter {
    position: absolute;
    bottom: 20px;
    right: 0;

    .detailButton {
      background: rgba(0, 0, 0, 0.75) !important;
      font-size: 24px;
    }
  }
}
</style>
