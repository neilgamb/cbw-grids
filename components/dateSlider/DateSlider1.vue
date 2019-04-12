<template>
  <div class="dateGlide">
    <div class="glide__track" data-glide-el="track">
      <ul class="glide__slides">
        <li v-for="(date, index) in dates" :key="index" class="date-container glide__slide">
          <div class="day-of-week">
            {{ dayOfWeek(date.date).toLowerCase() }}
          </div>
          <div class="calendar-container">
            <div class="month">
              {{ monthOfYear(date.date).toLowerCase() }}
            </div>
            <div class="day">
              {{ date.date.getDate() }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Glide from '@glidejs/glide'
import { mapActions, mapGetters } from 'vuex'
import { dayOfWeek, monthOfYear } from '../../assets/helpers.js'

export default {
  name: 'DateSlider1',
  data() {
    return {
      glide: null
    }
  },
  computed: {
    ...mapGetters({
      dates: 'general/dates',
      currentDay: 'general/currentDay'
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
      const glide = new Glide('.dateGlide', {
        type: 'carousel',
        startAt: 0,
        perView: 1,
        animationDuration: 300,
        rewindDuration: 0
      })

      this.glide = glide

      glide.on(['run'], () => {
        this.setCurrentDay(glide.index)
      })

      glide.mount()
    },
    dayOfWeek: dayOfWeek,
    monthOfYear: monthOfYear
  }
}
</script>

<style lang="scss" scoped>
@import "node_modules/@glidejs/glide/src/assets/sass/glide.core";
@import "node_modules/@glidejs/glide/src/assets/sass/glide.theme";

.date-container {
  display: flex;
  justify-content: space-around;

  .day-of-week {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }

  .calendar-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .month {
      font-size: 14px;
    }

    .day {
      font-size: 20px;
      line-height: 20px;
    }
  }
}
</style>
