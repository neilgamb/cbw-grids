<template>
  <GridContainer
    :current-period="currentPeriod"
    class="gridViewContainer"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import GridContainer from '../components/grid/GridContainer'

export default {
  name: 'GridView',
  auth: false,
  components: {
    GridContainer
  },
  computed: {
    ...mapGetters({ currentPeriod: 'general/currentPeriod' })
  }
}
</script>
