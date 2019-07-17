<template>
  <v-container fluid fill-height>
    <v-layout v-if="profile" justify-center>

      <v-flex xs12 sm6>
        <v-card>
          <v-img :aspect-ratio="16/9" :src="profilePicUrl">
            <v-layout pa-2 column fill-height class="lightbox white--text">
              <v-card-title>
                <v-spacer></v-spacer>
                <profile-pic-uploader v-if="profile.userId === userProfile.userId" @downloadURL="getDownloadUrl" :userId="profile.userId" class="mb-4"></profile-pic-uploader>
              </v-card-title>
              <v-spacer></v-spacer>
              <v-flex shrink>
                <div class="display-1">{{profile.alias}}</div>
                <div class="headline">{{profile.name}}</div>
              </v-flex>
            </v-layout>
          </v-img>

          <v-card-title>
            <v-flex>
              <div class="subheading">About me</div>
              <div>This is some text where I can tell you a little bit about myself.</div>
            </v-flex>

            <v-flex>
              <div class="subheading">Interests</div>
              <div>Here are some things that I find interesting.</div>
            </v-flex>

            <v-flex>
              <div class="subheading">Friends</div>
              <div>This is a list of my ConPUG friends.</div>
            </v-flex>
          </v-card-title>

          <!--<v-list two-line>-->
            <!--<v-list-tile @click="">-->
              <!--<v-list-tile-action>-->
                <!--<v-icon color="indigo">phone</v-icon>-->
              <!--</v-list-tile-action>-->

              <!--<v-list-tile-content>-->
                <!--<v-list-tile-title>(650) 555-1234</v-list-tile-title>-->
                <!--<v-list-tile-sub-title>Mobile</v-list-tile-sub-title>-->
              <!--</v-list-tile-content>-->

              <!--<v-list-tile-action>-->
                <!--<v-icon>chat</v-icon>-->
              <!--</v-list-tile-action>-->
            <!--</v-list-tile>-->

            <!--<v-list-tile @click="">-->
              <!--<v-list-tile-action></v-list-tile-action>-->

              <!--<v-list-tile-content>-->
                <!--<v-list-tile-title>(323) 555-6789</v-list-tile-title>-->
                <!--<v-list-tile-sub-title>Work</v-list-tile-sub-title>-->
              <!--</v-list-tile-content>-->

              <!--<v-list-tile-action>-->
                <!--<v-icon>chat</v-icon>-->
              <!--</v-list-tile-action>-->
            <!--</v-list-tile>-->

            <!--<v-divider inset></v-divider>-->

            <!--<v-list-tile @click="">-->
              <!--<v-list-tile-action>-->
                <!--<v-icon color="indigo">mail</v-icon>-->
              <!--</v-list-tile-action>-->

              <!--<v-list-tile-content>-->
                <!--<v-list-tile-title>aliconnors@example.com</v-list-tile-title>-->
                <!--<v-list-tile-sub-title>Personal</v-list-tile-sub-title>-->
              <!--</v-list-tile-content>-->
            <!--</v-list-tile>-->

            <!--<v-list-tile @click="">-->
              <!--<v-list-tile-action></v-list-tile-action>-->

              <!--<v-list-tile-content>-->
                <!--<v-list-tile-title>ali_connors@example.com</v-list-tile-title>-->
                <!--<v-list-tile-sub-title>Work</v-list-tile-sub-title>-->
              <!--</v-list-tile-content>-->
            <!--</v-list-tile>-->

            <!--<v-divider inset></v-divider>-->

            <!--<v-list-tile @click="">-->
              <!--<v-list-tile-action>-->
                <!--<v-icon color="indigo">location_on</v-icon>-->
              <!--</v-list-tile-action>-->

              <!--<v-list-tile-content>-->
                <!--<v-list-tile-title>1400 Main Street</v-list-tile-title>-->
                <!--<v-list-tile-sub-title>Orlando, FL 79938</v-list-tile-sub-title>-->
              <!--</v-list-tile-content>-->
            <!--</v-list-tile>-->
          <!--</v-list>-->


          <activities-list :organizer="profile.slug" :participant="profile.slug"></activities-list>
        </v-card>
      </v-flex>

    </v-layout>
    <v-dialog v-if="profile && profile.userId === userProfile.userId" v-model="dialog">
      <v-btn fab bottom right fixed dark color="pink" slot="activator">
        <v-icon>edit</v-icon>
      </v-btn>

      <v-card>
        <v-card-title
            class="grey lighten-4 py-4 title"
        >
          Edit profile
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
  import ProfilePicUploader from '@/components/ProfilePicUploader'

  export default {
    name: 'profile',
    props: ['userId'],
    components: {
      ProfilePicUploader,
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
      ...mapState(['userProfile']),
      profilePicUrl () {
        console.log('profilePicUrl computed')
        return this.profile.picUrl || require('../assets/conpug.png')
      }
    },
    methods: {
      getDownloadUrl (v) {
        console.log(`getDownloadUrl: ${v} `)
        this.profile.picUrl = v
        this.$store.dispatch('updateUserProfile', this.profile)
      },
      loadProfile(userId) {
        this.$store.dispatch('loadProfile', userId)
          .then((profile) => {
            console.dir(profile)
            this.profile = profile
          })
          .catch(err => {
            console.log(err.message)
          })
      }
    },
    created() {
      this.loadProfile(this.userId)
    },
    beforeRouteUpdate (to, from, next) {
      this.loadProfile(to.params.userId)
      next()
    }
  }
</script>

<style scoped>
  .lightbox {
    box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 144px);
  }
</style>
