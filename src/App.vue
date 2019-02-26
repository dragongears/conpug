<template>
  <v-app>
    <nav-drawer></nav-drawer>
    <nav-bar></nav-bar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

import NavDrawer from './components/NavDrawer'
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    NavDrawer,
    NavBar
  },
  data () {
    return {
      //
    }
  },
  created() {
    this.$store.dispatch('loadActivities')
  }
}
</script>
