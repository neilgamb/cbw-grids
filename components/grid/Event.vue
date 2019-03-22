<template>
  <div class="event">
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
      <div class="time-and-price">
        <div class="time">
          {{ eventTime(event.event.date) }}
        </div>
        <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
        <div v-if="event.event.price" class="price">
          ${{ event.event.price }}
        </div>
      </div>
      <div v-if="event.event.price" class="tickets">
        <v-btn small color="success" target="_blank" :href="`${event.event.tix}`">
          Purchase Tickets
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
      dialog: false,
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

  .band-container {
    flex: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .band {
      font-size: 18px;
      width: 100%;
      text-align: center;
    }

    .featuring {
      // font-size: 10px;
      margin-top: 5px;
      width: 100%;
      text-align: center;

      .feature {
        // font-size: 12px;
        margin-top: 3px;
      }
    }
  }

  .details-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .time-and-price {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.showDetailContainer {

  .showDetail {
    font-size: 16px;

    .time {
      font-family: "Avenir", Helvetica, Arial, sans-serif;
    }

    .featuring {

      p {
        font-size: 12px;
        margin-bottom: 5px;
      }

      .feature {
        margin-bottom: 0px;
        font-family: "Avenir", Helvetica, Arial, sans-serif;
      }
    }
  }
}
</style>
