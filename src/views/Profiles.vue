<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs10>

        <v-list two-line>
          <template v-for="(profile, index) in profiles">
            <v-list-tile :key="index" avatar :to="'/profiles/' + profile.id">
              <v-list-tile-avatar>
                <!--<img :src="profile.avatar">-->
                <img :src="require('../assets/conpug.png')">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="profile.alias"></v-list-tile-title>
                <v-list-tile-sub-title v-html="profile.name"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Profiles',
    computed: {
      ...mapState({
        profiles: 'loadedProfiles'
      })
    },
    created() {
      this.$store.dispatch('loadProfiles')
    }
  }
</script>

<style scoped>

</style>
