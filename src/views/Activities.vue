<template>
  <v-container fluid fill-height>
    <v-layout v-if="userProfile" justify-center>
      <v-flex xs10>
        <activities-list :organizer="userProfile.id" :participant="userProfile.id"></activities-list>
      </v-flex>
    </v-layout>
    <new-activity></new-activity>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import ActivitiesList from '@/components/ActivitiesList'
  import NewActivity from '@/components/NewActivity'

  export default {
    name: 'activities',
    components: {
      NewActivity,
      ActivitiesList
    },
    data() {
      return {
      }
    },
    methods: {
      selectActivity(id) {
        console.log(`click ${id}`)
      }
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
