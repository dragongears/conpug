<template>
  <v-container fluid fill-height>
    <v-layout v-if="userProfile" justify-center>
      <v-flex xs10>
        <activities-list :organizer="userProfile.id" :participant="userProfile.id"></activities-list>
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
