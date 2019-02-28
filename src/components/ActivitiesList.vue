<template>
  <v-expansion-panel v-if="filteredActivities.length != 0">
    <template>
      <v-expansion-panel-content v-for="(activity, idx) in filteredActivities" :key="idx" >
        <div slot="header">{{activity.name}}</div>
        <v-card>
          <v-card-text>
            <p v-if="sameDate(activity)">
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
            <p v-if="activity.organizers.includes(organizer)">
              Organizer
            </p>
            <p v-if="activity.participants.includes(participant)">
              Participant
            </p>
            <v-btn :to="'/activities/' + activity.id">
              View Activity
              <v-icon left light>arrow_forward</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </template>
  </v-expansion-panel>
  <v-card v-else>
    <v-card-text>
      No activities
    </v-card-text>
  </v-card>
</template>

<script>
  import spacetime from 'spacetime'
  import { mapState } from 'vuex'

  export default {
    name: 'activites-list',
    props: ['organizer', 'participant'],
    methods: {
      sameDate(a) {
        return spacetime(a.startDateTime).isSame(spacetime(a.endDateTime), 'date')
      },
    },
    computed: {
      filteredActivities() {
        return this.activities.filter(activity => {
          if (!this.organizer && !this.participant) {
            return true
          }
          if (activity.organizers.includes(this.organizer) || activity.participants.includes(this.participant)) {
            return true
          }
          return false
        })
      },
      ...mapState({
        activities: 'loadedActivities'
      })
    }
  }
</script>

<style scoped>

</style>
