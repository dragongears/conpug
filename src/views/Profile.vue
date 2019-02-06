<template>
  <v-container fill-height>
    <div v-if="userProfile">
      Profile: {{userProfile.id}}
    </div>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'profile',
    computed: {
      ...mapState(['userProfile'])
    }
  }
</script>

<style scoped>

</style>
