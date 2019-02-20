<template>
  <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      v-model="drawer"
  >
    <v-list dense>
      <v-list-tile v-if="userProfile" avatar @click="">
        <v-list-tile-avatar>
          <img :src="require('../assets/conpug.png')">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-if="userProfile">{{ userProfile.alias }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <template v-for="item in items">
        <v-layout
            row
            v-if="item.heading"
            align-center
            :key="item.heading"
        >
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-flex>
        </v-layout>
        <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click=""
          >
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else @click="item.action" :key="item.text">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>

</template>

<script>
  import { mapState } from 'vuex'

  function noop () {
    console.log(`noop`)
  }


  export default {
    name: 'NavDrawer',
    data() {
      return {
        items: [
          { icon: 'event', text: 'Activities', action: this.activitiesAction },
          { icon: 'map', text: 'Map', action: noop },
          {
            icon: 'keyboard_arrow_up',
            'icon-alt': 'keyboard_arrow_down',
            text: 'Friends',
            model: true,
            children: [
              { text: 'Friend 1', action: noop },
              { text: 'Friend 2', action: noop },
              { text: 'Friend 3', action: noop },
              { icon: 'add', text: 'Add friend' }
            ]
          },
          {
            icon: 'keyboard_arrow_up',
            'icon-alt': 'keyboard_arrow_down',
            text: 'Interests',
            model: false,
            children: [
              { text: 'Interest 1', action: noop },
              { text: 'Interest 2', action: noop },
              { text: 'Interest 3', action: noop },
              { icon: 'add', text: 'Add interest' }
            ]
          },
          { icon: 'settings', text: 'Settings', action: noop },
          { icon: 'chat_bubble', text: 'Send feedback', action: noop },
          { icon: 'help', text: 'Help', action: noop }
        ]
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
      activitiesAction () {
        console.log(`activites action`)
        this.$router.push({ name: 'activities' })
      }
    }
  }
</script>

<style scoped>

</style>
