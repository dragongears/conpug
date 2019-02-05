<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-card-title>
            Create a new account
          </v-card-title>
          <v-card-text>
            <v-form
                ref="form"
                lazy-validation
            >
              <v-text-field
                  v-model="email"
                  label="Email"
                  required
                  @input="clearFeedback"
              ></v-text-field>
              <v-text-field
                  v-model="password"
                  label="Password"
                  required
                  @input="clearFeedback"
              ></v-text-field>
            </v-form>
            <p>
              Or
              <router-link to="login">login</router-link>
              as a registered user
            </p>
            <v-alert
                :value="feedback"
                color="error"
                icon="warning"
                outline
            >
              {{ feedback}}
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-btn
                color="success"
                @click="signUp"
            >
              Sign up
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'SignUp',
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            console.dir(user)
            this.$router.replace('home')
          },
          (err) => {
            alert(`Sign up error: ${err.message}`)
          }
        )
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
