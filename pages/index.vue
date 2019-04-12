<template>
  <div>
    <GridContainer
      :current-period="currentPeriod"
      class="gridViewContainer"
    />
    <Loader v-if="loading" class="loader" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GridContainer from '../components/grid/GridContainer'
import Loader from '../components/grid/Loader'

export default {
  name: 'GridView',
  auth: false,
  components: {
    GridContainer,
    Loader
  },
  computed: {
    ...mapGetters({
      currentPeriod: 'general/currentPeriod',
      loading: 'general/loading'
    })
  }
}
</script>

<style lang="scss" scoped>
.loader {
  position: absolute;
  top: 50%; right: 50%;
  transform: translate(50%,-50%);
}
</style>
