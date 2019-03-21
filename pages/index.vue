<template>
  <Grid
    :current-day="currentDay"
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
  components: {
    Grid
  },
  computed: {
    ...mapGetters({
      dates: 'general/dates',
      grid: 'grid/grid',
      currentDay: 'general/currentDay'
    })
  },
  methods: {
    ...mapActions({ setCurrentDay: 'general/setCurrentDay' })
  }
}
</script>

<style lang='scss' scoped>
.gridViewContainer {
  padding: 0px 10px;
}
</style>
