<template>
  <v-dialog
    v-model="dialog"
    scrollable
    :fullscreen="isMobile"
    width="800"
  >
    <v-card color="#212121" class="eventDetailContainer">
      <div class="eventDetailHeader">
        <h1>{{ event.event.band }}</h1>
        <h2>{{ venue && venue.name }}</h2>
        <h2>{{ formatDate }}</h2>
      </div>

      <div id="#map" />

      <v-card-actions class="eventDetailFooter">
        <v-spacer />
        <v-btn
          color="white"
          outline
          large
          @click="dialog = false"
        >
          Close
        </v-btn>
        <v-btn
          color="white"
          outline
          large
          @click="dialog = false"
        >
          Tickets
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'

export default {
  name: 'EventDetail',
  props: {
    event: { type: Object, default: () => {} },
    venue: { type: Object, default: () => {} },
    eventDetailOpen: { type: Boolean, default: false },
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
  watch: {
    eventDetailOpen(open) {
      this.dialog = open
    },
    dialog(open) {
      if (!open) this.closeEventDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.eventDetailContainer {
  position: relative;

  .eventDetailHeader {
    position: absolute;
    top: 0;
    padding: 10px;
  }

  #map {
    height: 100%;
    width: 100%;
  }

  .eventDetailFooter {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
