<template>
  <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp"
             app
             fixed
  >
    <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn flat large to="home" class="logo hidden-sm-and-down">
        <span class="font-weight-light">Con</span>PUG
      </v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="!user" flat to="signup">
      <span class="mr-2">Sign Up</span>
    </v-btn>
    <v-btn v-if="!user" flat to="login">
      <span class="mr-2">Login</span>
    </v-btn>
    <v-btn v-if="user && userProfile" flat :to="'/profiles/' + userProfile.id">
      <span v-if="userProfile" class="mr-2">{{ userProfile.alias }}</span>
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
    name: 'NavBar',
    data(){
      return{
      }
    },
    computed: {
      drawer: {
        get() { return this.$store.state.drawer; },
        set(value) { this.$store.commit('setDrawer', value); },
      },
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
