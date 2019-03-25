<template>
  <div>
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
  </div>
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
    text-align: center;
    font-size: 18px;
  }

  .events {
    flex: 4;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-left: 3px solid white;
  }
</style>
