<template>
  <div
    class="event"
    :class="{ eventSelected: eventSelected }"
    @click="eventSelected = !eventSelected"
  >
    <v-icon v-if="eventSelected">
      favorite
    </v-icon>
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
      <div v-if="event.event.price" class="tickets">
        <v-btn style="font-size: 16px" small outline target="_blank" :href="`${event.event.tix}`">
          Tix
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'Event',
  props: {
    event: { type: Object, default: () => {} }
  },
  data() {
    return {
      eventSelected: false,
      venue: null
    }
  },
  computed: {
    ...mapGetters({ venues: 'grid/venues' })
  },
  mounted() {
    const { event, venues } = this
    this.venue = venues.find(venue => venue.venue.id === event.event.venue).venue
  },
  methods: {
    eventTime: function (date) {
      return moment(date).format('h:mm a')
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

.eventSelected {
  filter: invert(100%);
  background: black;
}
</style>
