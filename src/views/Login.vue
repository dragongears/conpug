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
                @keyup.native.enter="login"
            >
              <v-text-field
                  v-model="email"
                  label="Email"
                  required
                  :rules="[v => !!v || 'Email is required']"
              ></v-text-field>
              <v-text-field
                  v-model="password"
                  label="Password"
                  required
                  :rules="[v => !!v || 'Password is required']"
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
    <loading-dialog :visible="dialog">
      Logging in
    </loading-dialog>
  </v-container>
</template>

<script>
  import firebase from 'firebase'
  import LoadingDialog from '@/components/LoadingDialog'

  export default {
    name: 'login',
    components: {
      LoadingDialog
    },
    data() {
      return {
        email: '',
        password: '',
        feedback: '',
        dialog: false
      }
    },
    methods: {
      login() {
        if (this.$refs.form.validate()){
          this.feedback = null
          this.dialog = true
          firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
              // this.$router.replace({ name: 'profile', params: { id: this.slug }  })
            })
            .catch(err => {
              this.feedback = err.message
            })
            .finally(() => {
              this.dialog = false
            })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
