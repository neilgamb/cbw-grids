<template>
  <div>
    <GridContainer
      v-if="!loading"
      :current-period="currentPeriod"
      class="gridViewContainer"
    />
    <div v-else>
      Loading
    </div>
  </div>
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
    ...mapGetters({
      loading: 'general/loading',
      currentPeriod: 'general/currentPeriod'
    })
  }
}
</script>
