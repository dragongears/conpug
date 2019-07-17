<template>
  <v-container fluid fill-height>
    <v-layout v-if="userProfile" justify-center>
      <v-flex xs10>
        <v-toolbar>
          <v-toolbar-title>Activities</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-flex xs8 sm5 md3>
            <v-overflow-btn
                :items="dropdownParticipation"
                :label="participation.text"
                hide-details
                flat
                v-model="participation"
            ></v-overflow-btn>
          </v-flex>
        </v-toolbar>
        <activities-list :organizer="userProfile.slug" :participant="userProfile.slug"></activities-list>
      </v-flex>
    </v-layout>
    <activity-dialog></activity-dialog>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import ActivitiesList from '@/components/ActivitiesList'
  import ActivityDialog from '@/components/ActivityDialog'

  export default {
    name: 'activities',
    components: {
      ActivityDialog,
      ActivitiesList
    },
    data() {
      return {
        participation: {text: 'All', value: 'all'},
        dropdownParticipation: [
          { text: 'All', value: 'all' },
          { text: 'Interested', value: 'interested' },
          { text: 'Attending', value: 'attending' },
          { text: 'Running', value: 'running' }
        ]
      }
    },
    methods: {
    },
    computed: {
      ...mapState({
        userProfile: 'userProfile'
      })
    }
  }
</script>

<style scoped>

</style>
