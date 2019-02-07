<template>
  <v-container fluid fill-height>
    <v-layout v-if="userProfile" justify-center>
      <v-flex xs10>
        <v-toolbar>
          <v-toolbar-title>{{userProfile.alias}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat>Link One</v-btn>
            <v-btn flat>Link Two</v-btn>
            <v-btn flat>Link Three</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card color="cyan darken-2">
          <v-card-title class="subheading">
            Activities
          </v-card-title>
          <v-card-text>
            <v-tabs v-model="active" >
              <v-tab ripple >
                Attending
              </v-tab>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>Test</v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab ripple >
                Interested
              </v-tab>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>Test</v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab ripple >
                All
              </v-tab>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>Test</v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
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
    <v-dialog v-model="dialog" width="800px">
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

  export default {
    name: 'profile',
    data() {
      return {
        active: null,
        dialog: false
      }
    },
    computed: {
      ...mapState(['userProfile'])
    }
  }
</script>

<style scoped>

</style>
