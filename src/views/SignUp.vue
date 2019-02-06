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
              ></v-text-field>
              <v-text-field
                  v-model="password"
                  label="Password"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="alias"
                  label="Alias"
                  required
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
  import db from '@/firebase/init'
  import slugify from 'slugify'

  export default {
    name: 'SignUp',
    data() {
      return {
        email: '',
        password: '',
        alias: '',
        slug: '',
        feedback: ''
      };
    },
    methods: {
      signUp: function() {
        if(this.alias && this.email && this.password){
          this.feedback = null
          this.slug = slugify(this.alias, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          })
          let ref = db.collection('users').doc(this.slug)
          ref.get()
            .then(doc => {
              if (doc.exists){
                this.feedback = 'This alias already exists'
              } else {
                // this alias does not yet exists in the db
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                  .then(credentials => {
                    ref.set({
                      alias: this.alias,
                      user_id: credentials.user.uid
                    })
                  })
                  .then(() => {
                    this.$router.push({ name: 'home' })
                  })
                  .catch(err => {
                    this.feedback = err.message
                  })
              }
            })
        } else {
          this.feedback = 'Please fill in all fields'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
