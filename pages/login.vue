<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">
              Login
            </h3>
          </div>
        </v-card-title>

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
