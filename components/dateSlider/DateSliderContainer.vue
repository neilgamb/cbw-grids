<template>
  <div>
    <DateSlider1 v-if="currentPeriod === 0" />
    <DateSlider2 v-if="currentPeriod === 1" />
    <DateSlider3 v-if="currentPeriod === 2" />
  </div>
</template>

<script>
import DateSlider1 from './DateSlider1'
import DateSlider2 from './DateSlider2'
import DateSlider3 from './DateSlider3'

export default {
  name: 'DateSliderContainer',
  components: {
    DateSlider1,
    DateSlider2,
    DateSlider3
  },
  props: {
    currentPeriod: { type: Number, default: null }
  }
}
</script>
