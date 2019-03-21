<template>
  <carousel
    :navigate-to="currentDay"
    :per-page="1"
    :mouse-drag="false"
    :pagination-enabled="false"
    @pageChange="handleSlideChange"
  >
    <slide v-for="date in dates" :key="date.date.toString()" class="day">
      <GridItem
        v-for="gridItem in grid"
        :key="gridItem.venue.name"
        :grid-item="gridItem"
        class="gridItem"
      />
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import GridItem from './GridItem'

export default {
  name: 'Grid',
  components: {
    Carousel,
    Slide,
    GridItem
  },
  props: {
    currentDay: { type: Number, default: null },
    setCurrentDay: { type: Function, default: () => 0 },
    dates: { type: Array, default: () => [] },
    grid: { type: Array, default: () => [] }
  },
  methods: {
    handleSlideChange: function (current) {
      this.setCurrentDay(current)
    }
  }
}
</script>

<style scoped>
.day {
  box-sizing: border-box;
}

.gridItem {
  display: flex;
  margin-top: 10px;
  /* border-bottom: 1px solid #56555e; */
}

.grid >>> .VueCarousel-wrapper {
  overflow-y: auto;
}
</style>
