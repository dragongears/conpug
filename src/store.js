import Vue from 'vue'
import Vuex from 'vuex'
import db from './firebase/init'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    drawer: null,
    user: null,
    userProfile: null,
    loadedActivities: [],
    loadedProfiles: []
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setDrawer(state, payload) {
      state.drawer = payload
    },
    setUser(state, payload) {
      state.user = payload
    },
    setUserProfile(state, payload) {
      state.userProfile = payload
    },
    setLoadedActivities (state, payload) {
      state.loadedActivities = payload
    },
    addActivity (state, payload) {
      state.loadedActivities.push(payload)
    },
    addProfile (state, payload) {
      state.loadedProfiles.push(payload)
    }
  },
  actions: {
    loadProfile ({commit, state}, profileId) {
      return new Promise((resolve, reject) => {
        let profile = state.loadedProfiles.find((profile) => {
          return profile.id === profileId
        })

        // return the profile from state.loadedProfiles array
        if (profile) {
          console.log('Profile data from Vuex store')
          resolve(profile)
        }

        // get the profile from the 'users' database collection
        commit('setLoading', true)
        let ref = db.collection('users').doc(profileId)

        ref.get()
          .then(function(doc) {
            commit('setLoading', false)
            if (doc.exists) {
              let profile = {...doc.data(), ...{id: profileId}}
              // add profile to loadedProfiles
              console.log('Commit profile from db to Vuex store')
              commit('addProfile', profile)
              console.log('Profile data from db:', doc.data());
              resolve(profile)
            } else {
              console.log('No such user profile');
              reject(new Error('No such user profile'))
            }
          })
          .catch(function(error) {
            console.log('Error getting user profile:', error);
            commit('setLoading', false)
            reject(error)
          });
      })
    },
    loadProfiles ({commit}) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        db.collection('profiles').get()
          .then((querySnapshot) => {
            const profiles = []
            querySnapshot.forEach((doc) => {
              console.dir(doc.data())
              const obj = doc.data()
              obj.id = doc.id
              profiles.push(obj)
            })
            commit('setLoadedProfiles', profiles)
            commit('setLoading', false)
            resolve()
          })
          .catch((error) => {
            console.log(error)
            commit('setLoadedProfiles', [])
            commit('setLoading', false)
            reject(error)
          })
      })
    },
    loadActivities ({commit}) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        db.collection('activities').get()
          .then((querySnapshot) => {
            const activities = []
            querySnapshot.forEach((doc) => {
              console.dir(doc.data())
              const obj = doc.data()
              obj.id = doc.id
              activities.push(obj)
            })
            commit('setLoadedActivities', activities)
            commit('setLoading', false)
            resolve()
          })
          .catch((error) => {
            console.log(error)
            commit('setLoadedActivities', [])
            commit('setLoading', false)
            reject(error)
          })
      })
    },
    createActivity ({commit}, payload) {
      return new Promise((resolve, reject) => {
        db.collection('activities').add(payload)
          .then((data) => {
            const key = data.key
            commit('addActivity', {
              ...payload,
              id: key
            })
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    }
  },
  getters: {
    loadedActivities (state) {
      return state.loadedActivities.sort((activityA, activityB) => {
        return activityA.date > activityB.date
      })
    },
    loadedActivity (state) {
      return (activityId) => {
        return state.loadedActivities.find((activity) => {
          return activity.id === activityId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }

})
