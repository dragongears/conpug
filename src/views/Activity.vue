<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs10 v-if="activity">
        <p>{{activity.name}}</p>
        <p v-if="isOrganizer">I am an organizer</p>
        <p v-if="isParticipant">I am a participant</p>
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

  export default {
    name: 'Activity',
    props: ['id'],
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
