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
    <DateSliderContainer
      :current-period="currentPeriod"
      class="dateSliderContainer"
    />
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DateSliderContainer from './dateSlider/DateSliderContainer'

export default {
  components: {
    DateSliderContainer
  },
  computed: {
    ...mapGetters({
      open: 'general/drawer',
      currentPeriod: 'general/currentPeriod',
      currentDay: 'general/currentDay'
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
    }
  }
}
</script>

<style lang="scss" scoped>
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

.dateSliderContainer {
  width: 40%;
  max-width: 200px;
}
</style>
