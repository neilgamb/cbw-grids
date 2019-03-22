<template>
  <v-card>
    <div class="venue">
      {{ gridItem.venue.venue.name }}
    </div>
    <div class="events">
      <Event
        v-for="event in gridItem.events"
        :key="event.band"
        :event="event"
      />
    </div>
  </v-card>
</template>

<script>
import Event from './Event'

export default {
  name: 'GridItem',
  components: {
    Event
  },
  props: {
    gridItem: { type: Object, default: () => {} }
  }
}
</script>

<style scoped>
  .venue {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    font-size: 18px;
    text-align: center;
  }

  .events {
    flex: 4;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-left: 1px solid #56555e;
  }
</style>
