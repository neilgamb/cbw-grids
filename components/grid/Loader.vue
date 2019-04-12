<template>
  <div class="loaderContainer">
    <v-progress-circular
      :size="70"
      :width="7"
      indeterminate
    />
  </div>
</template>

<script>

export default {
  name: 'Loader'
}
</script>

<style lang="scss" scoped>
.noFavoritesMsg {
  height: 62vh;
  display: flex;
  align-items: center;
  background: #212121;

  h2 {
    text-align: center;
  }
}
</style>
