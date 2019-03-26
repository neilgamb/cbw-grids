<template>
  <!-- <carousel
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
  </carousel> -->
  <div class="glide">
    <div class="glide__track" data-glide-el="track">
      <ul class="glide__slides">
        <li v-for="date in dates" :key="date.date.toString()" class="day glide__slide">
          <GridItem
            v-for="gridItem in grid"
            :key="gridItem.venue.name"
            :grid-item="gridItem"
            class="gridItem"
          />
        </li>
      </ul>
    </div>
    <!-- <div class="glide__bullets" data-glide-el="controls[nav]">
      <button class="glide__bullet" data-glide-dir="=0"></button>
      <button class="glide__bullet" data-glide-dir="=1"></button>
      <button class="glide__bullet" data-glide-dir="=2"></button>
    </div> -->
  </div>
</template>

<script>
// import { Carousel, Slide } from 'vue-carousel'
import Glide from '@glidejs/glide'
import GridItem from './GridItem'

export default {
  name: 'Grid',
  data() {
    return {
      glide: null
    }
  },
  components: {
    // Carousel,
    // Slide,
    GridItem
  },
  props: {
    currentDay: { type: Number, default: null },
    setCurrentDay: { type: Function, default: () => 0 },
    dates: { type: Array, default: () => [] },
    grid: { type: Array, default: () => [] }
  },
  mounted() {
    this.glide = new Glide('.glide').mount()
  },
  watch: {
    currentDay: function (val) {
      console.log(val) // eslint-disable-line
      this.glide.go(`=${val}`)
    }
  },
  methods: {
    handleSlideChange: function (current) {
      this.setCurrentDay(current)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "node_modules/@glidejs/glide/src/assets/sass/glide.core";
@import "node_modules/@glidejs/glide/src/assets/sass/glide.theme";

.day {
  box-sizing: border-box;
}

.gridItem {
  display: flex;
  border-bottom: 3px solid white;
}

// .grid >>> .VueCarousel-wrapper {
//   overflow-y: auto;
// }
</style>
