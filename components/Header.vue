<template>
  <v-toolbar
    clipped-left
    dark
    fixed
    flat
    app
    class="headerContainer"
  >
    <v-toolbar-title class="titleContainer">
      <v-toolbar-side-icon @click="handleDrawerToggle" />
      <h1>grids</h1>
    </v-toolbar-title>
    <div v-if="!isMobile" class="manualDateNav">
      <v-btn icon color="primary darken-2" @click="currentDayDown">
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-btn icon color="primary darken-2" @click="currentDayUp">
        <v-icon>keyboard_arrow_right</v-icon>
      </v-btn>
    </div>
    <div class="carouselContainer">
      <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides">
          <li v-for="date in dates" :key="date.date.toString()" class="date-container glide__slide">
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
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Glide from '@glidejs/glide'
import { dayOfWeek, monthOfYear } from '../assets/helpers'

export default {
  data() {
    return {
      glide: null
    }
  },
  computed: {
    ...mapGetters({
      open: 'general/drawer',
      dates: 'general/dates',
      currentDay: 'general/currentDay',
      currentPeriod: 'general/currentPeriod'
    }),
    isMobile() {
      return window.innerWidth < 1024
    }
  },
  watch: {
    currentDay: function (val) {
      this.glide.go(`=${val}`)
    },
    currentPeriod: function () {
      if (!this.glide) this.createGlide()
      this.glide.destroy()
      this.glide = null
    }
  },
  mounted() {
    this.createGlide()
  },
  methods: {
    ...mapActions({
      openDrawer: 'general/openDrawer',
      closeDrawer: 'general/closeDrawer',
      setCurrentDay: 'general/setCurrentDay'
    }),
    handleDrawerToggle() {
      const { open } = this
      open ? this.closeDrawer() : this.openDrawer()
    },
    getDates(dates, period) {
      return dates.filter(date => date.period === period)
    },
    currentDayDown() {
      const { currentDay } = this
      let newDay = currentDay

      if (currentDay === 0) return null
      newDay--

      this.setCurrentDay(newDay)
    },
    currentDayUp() {
      const { currentDay, currentPeriod } = this
      let newDay = currentDay

      if ((currentPeriod === 0 || currentPeriod === 2) && currentDay === 3) return null
      if (currentPeriod === 1 && currentDay === 2) return null

      newDay++
      this.setCurrentDay(newDay)
    },
    createGlide() {
      const glide = new Glide('.carouselContainer', {
        type: 'carousel',
        startAt: 0,
        perView: 1,
        animationDuration: 500
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

/deep/ .v-toolbar__content {
  padding: 0px;
}

.headerContainer {
  border-bottom: 3px solid white;
}

.titleContainer {
  width: 100%;
  display: flex;
  // justify-content: space-between;
}

.manualDateNav {
  display: flex;
}

.carouselContainer {
  width: 40%;
  max-width: 200px;

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
}
</style>
