<template>
  <v-navigation-drawer :value="open" mini-variant clipped fixed app>
    <v-list>
      <v-list-tile to="/" router exact>
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to="/inspire" router exact>
        <v-list-tile-action>
          <v-icon>code</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Inspire</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to="/login" router exact @click="logout">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ open: 'general/drawer' })
  },
  methods: {
    logout() {
      this.$auth.logout()
    }
  }
}
</script>
