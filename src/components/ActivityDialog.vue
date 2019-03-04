<template>
  <div>
    <v-dialog v-model="dialog">
      <v-btn fab bottom right fixed dark color="pink" slot="activator">
        <v-icon v-if="!activity">add</v-icon>
        <v-icon v-else>edit</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <h2 v-if="!activity">Add a New Activity</h2>
          <h2 v-else>Edit {{activity.name}}</h2>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submit" class="px-3">
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12 align-center justify-space-between>
                  <v-layout align-center>
                    <v-text-field
                        v-model="dialogData.name"
                        prepend-icon="business"
                        label="Activity"
                        required
                    ></v-text-field>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex sm3>
                  <date-picker v-model="dialogData.startDate" label="Start date" prepend-icon="event"></date-picker>
                </v-flex>
                <v-flex sm3>
                  <time-picker v-model="dialogData.startTime" label="Start time" prepend-icon="access_time"></time-picker>
                </v-flex>
                <v-flex sm3>
                  <date-picker v-model="dialogData.endDate" label="End date" prepend-icon="event"></date-picker>
                </v-flex>
                <v-flex sm3>
                  <time-picker v-model="dialogData.endTime" label="End time" prepend-icon="access_time"></time-picker>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                      v-model="dialogData.location"
                      prepend-icon="place"
                      label="Location"
                      required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                      v-model="dialogData.summary"
                      prepend-icon="short_text"
                      label="Summary"
                      required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                      v-model="dialogData.description"
                      prepend-icon="notes"
                      label="Description"
                      required
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="submit" :disabled="!formIsValid">Save</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="error" @click="deleteActivity">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
        v-model="snackbar"
        :color="snackbarColor"
        :multi-line="true"
        @close="snackbarClose"
    >
      {{ snackbarText }}
      <v-btn
          dark
          flat
          @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import spacetime from 'spacetime'
  import { mapState } from 'vuex'
  import DatePicker from '@/components/DatePicker'
  import TimePicker from '@/components/TimePicker'

  export default {
    name: 'ActivityDialog',
    components: {
      DatePicker,
      TimePicker
    },
    props: ['activity'],
    data() {
      return {
        active: null,
        dialog: false,
        snackbar: false,
        snackbarText: '',
        snackbarColor: 'Info',
        dialogData: {
          name: this.activity && this.activity.name || '',
          location: this.activity && this.activity.location || '',
          summary: this.activity && this.activity.summary || '',
          description: this.activity && this.activity.description || '',
          startDate: this.activity && spacetime(this.activity.startDateTime) || spacetime.now().format('{year}-{month-pad}-{date-pad}'),
          startTime: this.activity && spacetime(this.activity.startDateTime).format('time') || spacetime.now().format('time'),
          endDate: this.activity && spacetime(this.activity.endDateTime) || spacetime.now().format('{year}-{month-pad}-{date-pad}'),
          endTime: this.activity && spacetime(this.activity.endDateTime).format('time') || spacetime.now().format('time')
        }
      }
    },
    methods: {
      snackbarClose() {
        console.log(`Snackbar closed`)
      },
      deleteActivity() {
        this.$store.dispatch('deleteActivity', this.activity.id)
          .then(() => {
            // this.snackbarColor = 'success'
            // this.snackbarText = 'Activity removed.'
            // this.snackbar = true
          })
          .catch(err => {
            console.log(err.message)
            // this.snackbarColor = 'error'
            // this.snackbarText = `The activity could not be removed: ${err.message}`
            // this.snackbar = true
          })
        this.dialog = false
        this.$emit('activity-deleted')
      },
      submit() {
        const payload = {
          id: this.activity && this.activity.id || undefined,
          activity: {
            name: this.dialogData.name,
            location: this.dialogData.location,
            summary: this.dialogData.summary,
            description: this.dialogData.description,
            startDateTime: spacetime(this.dialogData.startDate).time(this.dialogData.startTime).format('iso'),
            endDateTime: spacetime(this.dialogData.endDate).time(this.dialogData.endTime).format('iso'),
            organizers: [this.userProfile.id],
            participants: [this.userProfile.id]
          }
        }

        this.$store.dispatch(this.activity ? 'updateActivity' : 'createActivity', payload)
          .then(() => {
            this.snackbarColor = 'success'
            this.snackbarText = this.activity ? 'Activity updated.' : 'Activity created.'
            this.snackbar = true
          })
          .catch(err => {
            console.log(err.message)
            this.snackbarColor = 'error'
            this.snackbarText = `The activity could not be ${this.activity ? 'updated' : 'created'}: ${err.message}`
            this.snackbar = true
          })

        this.dialog = false
      }
    },
    computed: {
      formIsValid () {
        return this.dialogData.name !== '' &&
          this.dialogData.summary !== '' &&
          this.dialogData.description !== '' &&
          this.dialogData.startDate !== '' &&
          this.dialogData.startTime !== '' &&
          this.dialogData.endDate !== '' &&
          this.dialogData.endTime !== ''
      },
      ...mapState({
        userProfile: 'userProfile'
      })
    }
  }
</script>

<style scoped>

</style>
