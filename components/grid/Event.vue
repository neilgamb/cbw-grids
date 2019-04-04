<template>
  <div
    class="event"
    :class="{eventFavorited: eventFavorited}"
    @click="handleEventClick"
  >
    <div class="iconContainer" :class="{active: eventFavorited}">
      <v-icon class="favoriteIcon">
        favorite
      </v-icon>
    </div>

    <EventDetail
      v-if="this.$auth.loggedIn && this.$route.name === 'profile'"
      :event="event"
      :venue="venue"
      :event-detail-open="eventDetailOpen"
      :close-event-detail="closeEventDetail"
    />

    <div class="band-container">
      <div class="band">
        {{ event.event.band }}
      </div>
      <div v-if="event.event.featuring && event.event.featuring.length > 0" class="featuring">
        <div>
          <i>featuring</i>
        </div>
        <div v-for="(feature, i) in event.event.featuring" :key="i" class="feature">
          {{ feature }}
        </div>
      </div>
    </div>
    <div class="details-container">
      <div class="time">
        {{ eventTime(event.event.date) }}
      </div>
      <div v-if="event.event.price" class="price">
        <v-icon>attach_money</v-icon>
        {{ event.event.price }}
      </div>
      <div v-if="event.event.tix" class="tickets">
        <v-btn style="font-size: 16px" small outline target="_blank" @click.stop="openTixLink(event.event.tix)">
          Tix
        </v-btn>
      </div>
      <div v-else>
        <i>Tix at door</i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import EventDetail from './EventDetail'

export default {
  name: 'Event',
  components: {
    EventDetail
  },
  props: {
    event: { type: Object, default: () => {} }
  },
  data() {
    return {
      venue: null,
      eventDetailOpen: false
    }
  },
  computed: {
    ...mapGetters({
      venues: 'grid/venues',
      favorites: 'general/favorites'
    }),
    eventFavorited() {
      const { favorites } = this
      return this.$route.name === 'index' && favorites && favorites.some(e => e === this.event._id)
    }
  },
  mounted() {
    const { event, venues } = this
    this.venue = venues.find(venue => venue.venue.id === event.event.venue).venue
  },
  methods: {
    ...mapActions({
      setFavorites: 'general/setFavorites'
    }),
    eventTime: function (date) {
      return moment(date).format('h:mm a')
    },
    handleEventClick() {
      if (
        this.$auth.$state.loggedIn &&
        this.$route.name === 'index'
      ) {
        this.toggleEventFavorite()
      } else {
        this.openEventDetail()
      }
    },
    toggleEventFavorite() {
      const favorites = this.favorites.slice()
      const favoriteEventIndex = favorites.findIndex(e => e === this.event._id)
      const favoriteEvent = favoriteEventIndex >= 0
      favoriteEvent ? favorites.splice(favoriteEventIndex, 1) : favorites.push(this.event._id)
      this.setFavorites(favorites)
    },
    openEventDetail() {
      this.eventDetailOpen = true
    },
    closeEventDetail() {
      this.eventDetailOpen = false
    },
    openTixLink(link) {
      window.open(link, '_blank')
    }
  }
}
</script>

<style lang='scss' scoped>
.event {
  display: flex;
  width: 100%;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;
  transition: 200ms;
  position: relative;

  .iconContainer {
    display: none;
    position: absolute;
    top: 7px;
    left: -20px;

    .favoriteIcon {
      color: #172dde;
      font-size: 40px;
    }
  }

  .band-container {
    flex: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .band {
      width: 100%;
      text-align: center;
      font-size: 20px;
    }

    .featuring {
      margin-top: 5px;
      width: 100%;
      text-align: center;

      .feature {
        margin-top: 3px;
        font-size: 16px;
      }
    }
  }

  .details-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    .time,
    .price,
    .tickets {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      font-size: 16px;
      max-width: 150px;

      i {
        font-size: 18px;
        margin-right: 3px;
      }
    }
  }
}

.eventFavorited {
  filter: invert(100%);
  background: black;

  .iconContainer {
    display: inline;
  }
}
</style>
