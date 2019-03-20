<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-card-title class="headline">
          Login
        </v-card-title>
        <v-card-text>
          <p>Please login with Google to access the grids!</p>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="orange" @click="login">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'Login',
  methods: {
    login() {
      this.$auth.loginWith('google')
    }
  }
}
</script>
