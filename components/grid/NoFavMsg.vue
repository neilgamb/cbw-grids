<template>
  <v-card
    color="#212121"
    class="noFavoritesMsg"
  >
    <v-card-text>
      <h2>You don't have any starred events for this date yet!</h2>
      <br>
      <h2>Go to <i>Menu</i> > <i>All Grids</i>, select an event that you are interested in and it show go here!</h2>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: 'NoFavMsg'
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
