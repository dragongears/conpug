<template>
  <v-container fluid fill-height>
    <v-layout v-if="profile" justify-center>
      <v-flex xs10>
        <v-toolbar>
          <v-toolbar-title>{{profile.alias}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat>Link One</v-btn>
            <v-btn flat>Link Two</v-btn>
            <v-btn flat>Link Three</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card>
          <v-card-title class="subheading">
            Activities
          </v-card-title>
          <v-card-text>
            <activities-list :organizer="profile.id" :participant="profile.id"></activities-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-btn
        fab
        bottom
        right
        color="pink"
        dark
        fixed
        @click="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title
            class="grey lighten-4 py-4 title"
        >
          Create contact
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img
                      src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                      alt=""
                  >
                </v-avatar>
                <v-text-field
                    placeholder="Name"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                  prepend-icon="business"
                  placeholder="Company"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                  placeholder="Job title"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                  prepend-icon="mail"
                  placeholder="Email"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                  type="tel"
                  prepend-icon="phone"
                  placeholder="(000) 000 - 0000"
                  mask="phone"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                  prepend-icon="notes"
                  placeholder="Notes"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import ActivitiesList from '@/components/ActivitiesList'

  export default {
    name: 'profile',
    props: ['id'],
    components: {
      ActivitiesList
    },
    data() {
      return {
        profile: null,
        active: null,
        dialog: false
      }
    },
    computed: {
      ...mapState(['userProfile'])
    },
    created() {
      this.$store.dispatch('loadProfile', this.id)
        .then((profile) => {
          this.profile = profile
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }
</script>

<style scoped>

</style>
