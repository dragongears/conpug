<template>
  <div>
    <v-dialog v-model="dialog">
      <v-btn fab bottom right fixed dark color="pink" slot="activator"><v-icon>add</v-icon></v-btn>
      <v-card>
        <v-card-title>
          <h2>Add a New Activity</h2>
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
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
            <v-btn flat type="submit" :disabled="!formIsValid">Save</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar
        v-model="snackbar"
        :color="snackbarColor"
        :multi-line="true"
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
    name: 'NewActivity',
    components: {
      DatePicker,
      TimePicker
    },
    data() {
      return {
        active: null,
        dialog: false,
        snackbar: false,
        snackbarText: '',
        snackbarColor: 'Info',
        dialogData: {
          name: '',
          location: '',
          summary: '',
          description: '',
          startDate: spacetime.now().format('{year}-{month-pad}-{date-pad}'),
          startTime: spacetime.now().format('time'),
          endDate: spacetime.now().format('{year}-{month-pad}-{date-pad}'),
          endTime: spacetime.now().format('time')
        }
      }
    },
    methods: {
      selectActivity(id) {
        console.log(`click ${id}`)
      },
      sameDate() {
        spacetime(this.activity.startDateTime).isSame(spacetime(this.activity.endDateTime), 'date')
      },
      submit() {
        const payload = {
          name: this.dialogData.name,
          location: this.dialogData.location,
          summary: this.dialogData.summary,
          description: this.dialogData.description,
          startDateTime: spacetime(this.dialogData.startDate).time(this.dialogData.startTime).format('iso'),
          endDateTime: spacetime(this.dialogData.endDate).time(this.dialogData.endTime).format('iso'),
          organizers: [this.userProfile.id],
          participants: [this.userProfile.id]
        }

        this.$store.dispatch('createActivity', payload)
          .then(() => {
            this.snackbarColor = 'success'
            this.snackbarText = 'Activity created.'
            this.snackbar = true
          })
          .catch(err => {
            console.log(err.message)
            this.snackbarColor = 'error'
            this.snackbarText = `The activity could not be created: ${err.message}`
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
