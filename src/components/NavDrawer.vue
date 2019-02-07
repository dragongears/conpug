<template>
  <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app
  >
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-if="userProfile">{{ userProfile.alias }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list dense>
      <template v-for="item in items">
        <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
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
            :key="item.text"
            v-model="item.model"
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
        <v-list-tile v-else :key="item.text">
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

  export default {
    name: 'NavDrawer',
    data() {
      return {
        items: [
          { icon: 'map', text: 'Map' },
          {
            icon: 'keyboard_arrow_up',
            'icon-alt': 'keyboard_arrow_down',
            text: 'Friends',
            model: true,
            children: [
              { text: 'Friend 1' },
              { text: 'Friend 2' },
              { text: 'Friend 3' },
              { icon: 'add', text: 'Add friend' }
            ]
          },
          {
            icon: 'keyboard_arrow_up',
            'icon-alt': 'keyboard_arrow_down',
            text: 'Interests',
            model: false,
            children: [
              { text: 'Interest 1' },
              { text: 'Interest 2' },
              { text: 'Interest 3' },
              { icon: 'add', text: 'Add interest' }
            ]
          },
          { icon: 'settings', text: 'Settings' },
          { icon: 'chat_bubble', text: 'Send feedback' },
          { icon: 'help', text: 'Help' }
        ]
      }
    },
    computed: {
      drawer: {
        get() { return this.$store.state.drawer; },
        set(value) { this.$store.commit('setDrawer', value); },
      },
      ...mapState(['user', 'userProfile'])
    }
  }
</script>

<style scoped>

</style>
