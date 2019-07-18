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
                @keyup.native.enter="signUp"
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
              <v-text-field
                  v-model="name"
                  label="Full Name"
                  required
                  :rules="[v => !!v || 'Name is required']"
              ></v-text-field>
              <v-text-field
                  v-model="alias"
                  label="Alias"
                  required
                  :rules="[v => !!v || 'Alias is required']"
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
    <loading-dialog :visible="dialog">
      Creating account
    </loading-dialog>
  </v-container>
</template>

<script>
  import firebase from 'firebase'
  import db from '@/firebase/init'
  import slugify from 'slugify'
  import spacetime from 'spacetime'
  import LoadingDialog from '@/components/LoadingDialog'

  export default {
    name: 'signup',
    components: {
      LoadingDialog
    },
    data() {
      return {
        email: '',
        password: '',
        name: '',
        alias: '',
        slug: '',
        feedback: '',
        dialog: false
      };
    },
    methods: {
      signUp: function() {
        if(this.$refs.form.validate()){
          this.feedback = null
          this.slug = slugify(this.alias, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          })

          this.dialog = true

          fetch(`https://us-central1-dragongears-conpug.cloudfunctions.net/testUserExists?slug=${this.slug}`)
            .then(response => {
              return response.json()
            })
            .then((res) => {
              if (!res.exists) {
                // this alias does not yet exists in the db
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                  .then(credentials => {
                    let ref = db.collection('users').doc(credentials.user.uid)
                    ref.set({
                      name: this.name,
                      alias: this.alias,
                      userId: credentials.user.uid,
                      creationDateTime: spacetime.now().format('iso'),
                      mostRecentLoginDateTime: spacetime.now().format('iso'),
                      picUrl: null,
                      slug: this.slug
                    })
                  })
                  .then(() => {
                    // this.$router.push({ name: 'profile', params: { id: this.slug } })
                  })
                  .catch(err => {
                    this.feedback = err.message
                  })
              } else {
                this.feedback = 'This alias already exists'
              }
              this.dialog = false
            })
            .catch((err) => {
              this.dialog = false
              this.feedback = err.message
            })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
