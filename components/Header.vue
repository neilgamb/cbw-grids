<template>
  <v-toolbar dark fixed app>
    <v-toolbar-title class="titleContainer">
      <v-toolbar-side-icon @click="handleDrawerToggle" />
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
      <carousel
        :navigate-to="currentDay"
        :per-page="1"
        :mouse-drag="false"
        :pagination-enabled="false"
        @pageChange="setCurrentDay"
      >
        <slide v-for="date in dates" :key="date.date.toString()" class="date-container">
          <div class="day-of-week">
            {{ dayOfWeek(date.date) }}
          </div>
          <div class="calendar-container">
            <div class="month">
              {{ monthOfYear(date.date) }}
            </div>
            <div class="day">
              {{ date.date.getDate() }}
            </div>
          </div>
        </slide>
      </carousel>
    </div>
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Carousel, Slide } from 'vue-carousel'
import { dayOfWeek, monthOfYear } from '../assets/helpers'

export default {
  components: {
    Carousel,
    Slide
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
    dayOfWeek: dayOfWeek,
    monthOfYear: monthOfYear
  }
}
</script>

<style lang="scss" scoped>
// @import "../scss/_mixins.scss";
// @import "../scss/variables.scss";

/deep/ .v-toolbar__content {
  padding: 0px;
}

.titleContainer {
  // height: 150%;
  width: 100%;
  display: flex;
  justify-content: space-between;

  .logoContainer {
    position: relative;
    width: 50%;

    .logo-jazzfest {
      // font-family: "Rock Salt", cursive;
      // color: $primary;
      font-size: 20px;
      line-height: 23px;
      // text-shadow: 1px 1px $black;
      transform: rotate(-32deg);
      z-index: 2;
      position: absolute;
      top: 20px;
      left: 10px;
    }

    .logo-grids {
      font-family: "Monoton", cursive;
      font-size: 35px;
      // color: lighten($secondary, 10%);
      // animation: glow 3s ease-in-out infinite alternate;
      position: absolute;
      top: 20px;
      left: 60px;
    }
  }
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
      // font-family: "Sedgwick Ave", cursive;
      font-size: 22px;
    }

    .calendar-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .month {
        font-size: 10px;
      }

      .day {
        font-size: 20px;
        line-height: 20px;
      }
    }
  }
}
</style>
