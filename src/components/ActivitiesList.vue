<template>
  <v-expansion-panel>
    <v-expansion-panel-content
        v-for="(activity, idx) in activities"
        :key="idx"
    >
      <div slot="header">{{activity.name}}</div>
      <v-card>
        <v-card-text>
          <p v-if="sameDate">
            <v-icon>event</v-icon>{{activity.startDateTime | date-time}} - {{activity.endDateTime | time}}
          </p>
          <p v-else>
            <v-icon>event</v-icon>{{activity.startDateTime | date-time}} - {{activity.endDateTime | date-time}}
          </p>
          <p>
            <v-icon>place</v-icon>{{activity.location}}
          </p>
          <p>
            <v-icon>short_text</v-icon>{{activity.summary}}
          </p>
          <p v-if="activity.organizers.includes(userProfile.id)">
            Organizer
          </p>
          <p v-if="activity.participants.includes(userProfile.id)">
            Participant
          </p>
          <v-btn :to="'/activities/' + activity.id">
            View Activity
            <v-icon left light>arrow_forward</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
  import spacetime from 'spacetime'
  import { mapState } from 'vuex'

  export default {
    name: 'activites-list',
    methods: {
      sameDate() {
        spacetime(this.activity.startDateTime).isSame(spacetime(this.activity.endDateTime), 'date')
      },
    },
    computed: {
      ...mapState({
        userProfile: 'userProfile',
        activities: 'loadedActivities'
      })
    }
  }
</script>

<style scoped>

</style>
