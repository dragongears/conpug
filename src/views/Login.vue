<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-card-title>
            Login
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
              ></v-text-field>
              <v-text-field
                  v-model="password"
                  label="Password"
                  required
              ></v-text-field>
            </v-form>
            <p>
              Don't have an account?
              <router-link to="/signup">Create one</router-link>
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
                @click="login"
            >
              Log in
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
    name: 'login',
    data() {
      return {
        email: '',
        password: '',
        feedback: ''
      }
    },
    methods: {
      login() {
        if (this.email && this.password){
          this.feedback = null
          firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
              this.$router.replace({ name: 'profile' })
            })
            .catch(err => {
              this.feedback = err.message
            })
        } else {
          this.feedback = 'Please fill in both fields'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
