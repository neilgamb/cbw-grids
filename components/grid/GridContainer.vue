<template>
  <div>
    <Grid1 v-if="currentPeriod === 0" />
    <Grid2 v-if="currentPeriod === 1" />
    <Grid3 v-if="currentPeriod === 2" />
  </div>
</template>

<script>
import Grid1 from './Grid1'
import Grid2 from './Grid2'
import Grid3 from './Grid3'

export default {
  name: 'GridContainer',
  components: {
    Grid1,
    Grid2,
    Grid3
  },
  props: {
    currentPeriod: { type: Number, default: null }
  }
}
</script>
