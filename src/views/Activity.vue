<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs10 v-if="activity">
        <v-card>
          <v-container
              fluid
              grid-list-lg
          >
            <v-layout row wrap>
              <v-flex xs12 >
                <v-card>
                  <v-card-title>
                    <span class="headline">{{activity.name}}</span>
                  </v-card-title>
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
                    <p>
                      <v-icon>notes</v-icon>{{activity.description}}
                    </p>
                    <p v-if="activity.organizers.includes(userProfile.id)">
                      Organizer
                    </p>
                    <p v-if="activity.participants.includes(userProfile.id)">
                      Participant
                    </p>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs10 v-else>
        <p>
          Invalid activity
        </p>
      </v-flex>
    </v-layout>
    <activity-dialog v-if="isOrganizer" :activity="activity" @activity-deleted="activityDeleted"></activity-dialog>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import spacetime from 'spacetime'
  import ActivityDialog from '@/components/ActivityDialog'

  export default {
    name: 'activity',
    components: {
      ActivityDialog
    },
    props: ['id'],
    methods: {
      activityDeleted() {
        this.$router.push({ name: 'activities' })
      },
      sameDate() {
        return spacetime(this.activity.startDateTime).isSame(spacetime(this.activity.endDateTime), 'date')
      }
    },
    computed: {
      activity () {
        return this.$store.getters.loadedActivity(this.id)
      },
      isOrganizer () {
        return this.activity && this.activity.organizers.includes(this.userProfile.id) || false
      },
      isParticipant () {
        return this.activity && this.activity.participants.includes(this.userProfile.id) || false
      },
      ...mapState({
        userProfile: 'userProfile'
      })

    }
  }
</script>

<style scoped>

</style>
