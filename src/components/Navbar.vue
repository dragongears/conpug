<template>
  <v-toolbar app>
    <v-toolbar-title class="headline">
      <span class="font-weight-light">Con</span>
      <span>PUG</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <ul class="right">
      <li v-if="!user"><router-link :to="{ name: 'Signup' }">Signup</router-link></li>
      <li v-if="!user"><router-link :to="{ name: 'Login' }">Login</router-link></li>
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
        // user: null
      }
    },
    computed: {
      ...mapState(['user'])
    },
    created(){
      // let user = firebase.auth().currentUser
      // firebase.auth().onAuthStateChanged((user) => {
      //   if(user){
      //     this.user = user
      //   } else {
      //     this.user = null
      //   }
      // })
    },
    methods: {
      logout(){
        firebase.auth().signOut().then(() => {
          this.$router.push({ name: 'Login' })
        })
      }
    }
  }
</script>

<style scoped>

</style>
