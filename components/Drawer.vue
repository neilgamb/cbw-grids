<template>
  <v-navigation-drawer
    v-model="drawer"
    class="drawerContainer"
    clipped
    fixed
    width="200"
    app
  >
    <v-list>
      <v-list-tile v-if="loggedIn" to="/profile" router exact>
        <v-list-tile-action>
          <v-avatar size="35">
            <img v-if="loggedIn" :src="profilePic">
            <v-icon v-else>
              person
            </v-icon>
          </v-avatar>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="navItem">
            My Grids
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile v-if="loggedIn" to="/map" router exact>
        <v-list-tile-action>
          <v-icon>public</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="navItem">
            My Map
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile to="/" router exact>
        <v-list-tile-action>
          <v-icon>grid_on</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="navItem">
            {{ loggedIn ? "All Grids" : "Grid" }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile v-if="!loggedIn" to="/login" router exact>
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="navItem">
            Sign In
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile v-if="loggedIn" @click="logout">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="navItem">
            Log Out
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ open: 'general/drawer' }),
    loggedIn() {
      return this.$auth.loggedIn
    },
    profilePic() {
      const { strategy, user } = this.$auth

      switch (strategy.name) {
        case 'google':
          return user.picture
        case 'facebook':
          return user.picture.data.url
        default: return 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
      }
    },
    drawer: {
      get() {
        return this.open
      },
      set(open) {
        if (!open) this.closeDrawer()
      }
    }
  },
  methods: {
    ...mapActions({
      openDrawer: 'general/openDrawer',
      closeDrawer: 'general/closeDrawer',
      setFavorites: 'general/setFavorites'
    }),
    login() {
      this.$auth.loginWith('google')
    },
    logout() {
      this.$auth.logout()
      this.setFavorites([])
    }
  }
}
</script>

<style lang="scss" scoped>
.drawerContainer {
  background: #212121;

  .navItem {
    font-size: 24px;
  }
}
</style>
