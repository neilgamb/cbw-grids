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
          <span class="tab">weekend<br>one</span>
        </v-btn>
      </div>
      <div class="bottomNavBtn" @click="setCurrentPeriod(bottomNav)">
        <v-btn dark>
          <span class="tab">daze<br>between</span>
        </v-btn>
      </div>
      <div class="bottomNavBtn" @click="setCurrentPeriod(bottomNav)">
        <v-btn dark>
          <span class="tab">weekend<br>two</span>
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
        case 0: return '#212121'
        case 1: return '#212121'
        case 2: return '#212121'
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
  border-top: 3px solid white;

  .bottomNavBtn {
    display: flex;
    justify-content: center;

    button {
      max-width: none;

      span {
        font-size: 16px;
      }
    }
  }

}
</style>
