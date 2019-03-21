<template>
  <v-toolbar
    clipped-left
    fixed
    app
    flat
  >
    <v-toolbar-side-icon @click="handleDrawerToggle" />
    <v-toolbar-title>CBW Grids</v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <carousel
        :navigateTo="currentDay"
        :per-page="1"
        :mouse-drag="true"
        :paginationEnabled="false"
        :scrollPerPage="true"
        paginationActiveColor="#f0f0f0"
        paginationColor="#666"
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
    </v-toolbar-items>
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
    })
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
