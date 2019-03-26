<template>
  <Grid
    :current-day="currentDay"
    :current-period="currentPeriod"
    :set-current-day="setCurrentDay"
    :dates="dates"
    :grid="grid"
    class="gridViewContainer"
  />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Grid from '../components/grid/Grid'

export default {
  name: 'GridView',
  auth: false,
  components: {
    Grid
  },
  computed: {
    ...mapGetters({
      dates: 'general/dates',
      grid: 'grid/grid',
      currentDay: 'general/currentDay',
      currentPeriod: 'general/currentPeriod'
    })
  },
  methods: {
    ...mapActions({ setCurrentDay: 'general/setCurrentDay' })
  }
}
</script>
