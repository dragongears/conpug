<template>
  <v-toolbar app>
    <v-toolbar-title class="headline">
      <v-btn flat large to="home" class="logo">
        <span class="font-weight-light">Con</span>
        PUG
      </v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="!user" flat to="signup">
      <span class="mr-2">Sign Up</span>
    </v-btn>
    <v-btn v-if="!user" flat to="login">
      <span class="mr-2">Login</span>
    </v-btn>
    <v-btn v-if="user" flat to="profile">
      <span class="mr-2">{{ userProfile.alias }}</span>
    </v-btn>
    <v-btn v-if="user" flat @click="logout">
      <span class="mr-2">Logout</span>
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
          this.$router.push({ name: 'home' })
        })
      }
    }
  }
</script>

<style scoped>
.logo {
  font-size: 28px;
  font-weight: normal;
}
</style>
