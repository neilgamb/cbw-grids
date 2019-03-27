<template>
  <div class="gridGlide">
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
  </div>
</template>

<script>
import Glide from '@glidejs/glide'
import GridItem from './GridItem'

export default {
  name: 'Grid',
  components: {
    GridItem
  },
  props: {
    currentDay: { type: Number, default: null },
    currentPeriod: { type: Number, default: null },
    setCurrentDay: { type: Function, default: () => 0 },
    dates: { type: Array, default: () => [] },
    grid: { type: Array, default: () => [] }
  },
  data() {
    return {
      glide: null
    }
  },
  watch: {
    currentDay: function (val) {
      this.glide.go(`=${val}`)
    },
    currentPeriod: function () {
      // if (!this.glide) {
      //   this.createGlide()
      // } else {
      //   this.glide.destroy()
      //   this.glide = null
      //   this.createGlide()
      // }
    }
  },
  mounted() {
    this.createGlide()
  },
  methods: {
    createGlide() {
      const glide = new Glide('.gridGlide', {
        type: 'carousel',
        startAt: 0,
        perView: 1,
        animationDuration: 500
      })

      // this.glide = glide

      glide.on(['run'], () => {
        this.setCurrentDay(glide.index)
      })

      glide.mount()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "node_modules/@glidejs/glide/src/assets/sass/glide.core";
@import "node_modules/@glidejs/glide/src/assets/sass/glide.theme";

.day {
  box-sizing: border-box;
  // width: 100vw;
}

.gridItem {
  display: flex;
  border-bottom: 3px solid white;
}

// .grid >>> .VueCarousel-wrapper {
//   overflow-y: auto;
// }
</style>
