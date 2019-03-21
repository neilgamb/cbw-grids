<template>
  <v-footer app height="auto" class="footerContainer">
    <v-bottom-nav
      class="bottomNav"
      :active.sync="bottomNav"
      :color="color"
      :value="true"
      dark
    >
      <div class="bottomNavBtn" @click="setCurrentPeriod(bottomNav)">
        <v-btn dark>
          <span>Weekend<br>One</span>
        </v-btn>
      </div>
      <div class="bottomNavBtn" @click="setCurrentPeriod(bottomNav)">
        <v-btn dark>
          <span>Daze<br>Between</span>
        </v-btn>
      </div>
      <div class="bottomNavBtn" @click="setCurrentPeriod(bottomNav)">
        <v-btn dark>
          <span>Weekend<br>Two</span>
        </v-btn>
      </div>
    </v-bottom-nav>
  </v-footer>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Footer',
  data() {
    return {
      bottomNav: 0
    }
  },
  computed: {
    color() {
      switch (this.bottomNav) {
        case 0: return '#48224f'
        case 1: return '#826316'
        case 2: return '#354d1a'
        default: return null
      }
    }
  },
  methods: {
    ...mapActions({ setCurrentPeriod: 'general/setCurrentPeriod' })
  }
}
</script>

<style lang="scss" scoped>
.footerContainer {
  height: auto;
  justify-content: flex-end;
  // font-family: "Rock Salt", cursive;

  .bottomNavBtn {
    display: flex;
    justify-content: center;

    button {
      max-width: none;
    }
  }

}
</style>
