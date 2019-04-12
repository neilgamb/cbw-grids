<template>
  <div class="gridGlide">
    <div class="glide__track" data-glide-el="track">
      <ul class="glide__slides">
        <li v-for="(date, index) in dates" :key="index" class="day glide__slide">
          <GridItem
            v-for="gridItem in grid"
            :key="gridItem.venue.name"
            :grid-item="gridItem"
            class="gridItem"
          />
          <NoFavMsg v-if="grid.length === 0" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Glide from '@glidejs/glide'
import { mapActions, mapGetters } from 'vuex'
import GridItem from './GridItem'
import NoFavMsg from './NoFavMsg'

export default {
  name: 'Grid2',
  components: {
    GridItem,
    NoFavMsg
  },
  data() {
    return {
      glide: null
    }
  },
  computed: {
    ...mapGetters({
      dates: 'general/dates',
      grid: 'grid/grid'
    })
  },
  watch: {
    currentDay: function (val) {
      this.glide.go(`=${val}`)
    }
  },
  mounted() {
    this.createGlide()
  },
  methods: {
    ...mapActions({ setCurrentDay: 'general/setCurrentDay' }),
    createGlide() {
      const glide = new Glide('.gridGlide', {
        type: 'carousel',
        startAt: 0,
        perView: 1,
        animationDuration: 500,
        swipeThreshold: 120
      })

      this.glide = glide

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
}

.gridItem {
  display: flex;
  border-bottom: 3px solid white;
}
</style>
