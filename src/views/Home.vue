<template>

  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs12 sm6>
        <h1 class="text-xs-center mt-3">Welcome to ConPUG</h1>
        <p class="text-xs-center mt-5">
          <v-btn to="signup">
            <span>Sign Up</span>
          </v-btn>
          or
          <v-btn to="login">
            <span>Login</span>
          </v-btn>
        </p>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  export default {
    name: 'home'
  }
</script>
