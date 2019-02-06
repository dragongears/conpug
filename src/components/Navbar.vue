<template>
  <v-toolbar app>
    <v-toolbar-title class="headline">
      <span class="font-weight-light">Con</span>
      <span>PUG</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <ul class="right">
      <li v-if="!user"><router-link :to="{ name: 'signup' }">Sign Up</router-link></li>
      <li v-if="!user"><router-link :to="{ name: 'login' }">Login</router-link></li>
      <li v-if="user"><a>{{ user.email }}</a></li>
      <li v-if="user"><a @click="logout">Logout</a></li>
    </ul>
    <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
    >
      <span class="mr-2">Latest Release</span>
    </v-btn>
  </v-toolbar>
</template>

<script>
  import firebase from 'firebase'
  import { mapState } from 'vuex'

  export default {
    name: 'Navbar',
    data(){
      return{
      }
    },
    computed: {
      ...mapState(['user', 'userProfile'])
    },
    methods: {
      logout(){
        firebase.auth().signOut().then(() => {
          this.$router.push({ name: 'login' })
        })
      }
    }
  }
</script>

<style scoped>

</style>
