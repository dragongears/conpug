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
                <v-card @click="selectActivity(activity.id)">
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
                    <p v-if="activity.organizers.includes(userProfile.id)">
                      Organizer
                    </p>
                    <p v-if="activity.participants.includes(userProfile.id)">
                      Participant
                    </p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn>
                      Edit Activity
                    </v-btn>
                  </v-card-actions>
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
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import spacetime from 'spacetime'

  export default {
    name: 'Activity',
    props: ['id'],
    methods: {
      sameDate() {
        spacetime(this.activity.startDateTime).isSame(spacetime(this.activity.endDateTime), 'date')
      }
    },
    computed: {
      activity () {
        return this.$store.getters.loadedActivity(this.id)
      },
      isOrganizer () {
        return this.activity.organizers.includes(this.userProfile.id)
      },
      isParticipant () {
        return this.activity.participants.includes(this.userProfile.id)
      },
      ...mapState({
        userProfile: 'userProfile'
      })

    }
  }
</script>

<style scoped>

</style>
