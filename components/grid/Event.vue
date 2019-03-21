<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template v-slot:activator="{ on }">
      <div class="event" v-on="on">
        <div class="time">
          {{ eventTime(event.event.date) }}
        </div>
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
      </div>
    </template>

    <v-card v-if="venue" class="showDetailContainer">
      <v-card-title>
        <h3>{{ event.event.band }}</h3>
      </v-card-title>
      <v-divider />
      <v-card-text class="showDetail">
        <p class="time">
          {{ eventTime(event.event.date) }} at {{ venue.name }}
        </p>
        <div v-if="event.event.featuring && event.event.featuring.length > 0" class="featuring">
          <p><i>Featuring</i></p>
          <p v-for="(feature, i) in event.event.featuring" :key="i" class="feature">
            {{ feature }}
          </p>
        </div>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="primary" :href="`${event.event.tix}`" target="_blank">
          Purchase Tix!
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
  flex-direction: row;
  box-sizing: border-box;

  .time {
    flex: 1;
    font-size: 12px;
    padding: 5px;
    // font-family: "Avenir", Helvetica, Arial, sans-serif;
  }

  .band-container {
    flex: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px 5px 5px 0px;

    .band {
      // font-family: 'Sedgwick Ave', cursive;
      // font-size: 14px;
      width: 100%;
      text-align: center;
    }

    .featuring {
      // font-size: 10px;
      margin-top: 5px;
      // font-family: "Avenir", Helvetica, Arial, sans-serif;
      width: 100%;
      text-align: center;

      .feature {
        // font-size: 12px;
        margin-top: 3px;
      }
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
