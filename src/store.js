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
    setLoadedProfiles (state, payload) {
      state.loadedProfiles = payload
    },
    addProfile (state, payload) {
      if (!state.loadedProfiles.includes((profile) => {
        return profile.id === payload.id
      })) {
        state.loadedProfiles.push(payload)
      }
    },
    modifyProfile (state, payload) {
      let idx = state.loadedProfiles.findIndex((profile) => {
        return profile.id === payload.id
      })
      if (idx === -1) {
        state.loadedProfiles.push(payload)
      } else {
        state.loadedProfiles[idx] = payload
      }
    },
    setLoadedActivities (state, payload) {
      state.loadedActivities = payload
    },
    addActivity (state, payload) {
      state.loadedActivities.push(payload)
    },
    modifyActivity (state, payload) {
      state.loadedActivities = state.loadedActivities.filter((activity) => {
        return activity.id !== payload.id
      })
      state.loadedActivities.push(payload)
    },
    removeActivity (state, payload) {
      state.loadedActivities = state.loadedActivities.filter((activity) => {
        return activity.id !== payload.id
      })
    }
  },
  actions: {
    updateUserProfile (context, userProfile) {
      return new Promise((resolve, reject) => {
        let {id, ...user} = userProfile
        let ref = db.collection('users').doc(id)
        ref.update(user)
          .then(() => {
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },
    loadProfile ({commit, state}, profileId) {
      return new Promise((resolve, reject) => {
        let profile = state.loadedProfiles.find((profile) => {
          return profile.id === profileId
        })

        // return the profile from state.loadedProfiles array
        if (profile) {
          resolve(profile)
          return
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
              commit('addProfile', profile)
              resolve(profile)
            } else {
              reject(new Error('No such user profile'))
            }
          })
          .catch(function(error) {
            commit('setLoading', false)
            reject(error)
          });
      })
    },
    loadProfiles ({commit}) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        db.collection('users').get()
          .then((querySnapshot) => {
            const profiles = []
            querySnapshot.forEach((doc) => {
              const obj = doc.data()
              obj.id = doc.id
              profiles.push(obj)
            })
            commit('setLoadedProfiles', profiles)
            commit('setLoading', false)
            resolve()
          })
          .catch((error) => {
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
              const obj = doc.data()
              obj.id = doc.id
              activities.push(obj)
            })
            commit('setLoadedActivities', activities)
            commit('setLoading', false)
            resolve()
          })
          .catch((error) => {
            commit('setLoadedActivities', [])
            commit('setLoading', false)
            reject(error)
          })
      })
    },
    createActivity ({commit}, payload) {
      return new Promise((resolve, reject) => {
        db.collection('activities').add(payload.activity)
          .then((data) => {
            const id = data.id
            commit('addActivity', {
              ...payload.activity,
              id: id
            })
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },
    updateActivity ({commit}, payload) {
      return new Promise((resolve, reject) => {
        let ref = db.collection('activities').doc(payload.id)
        ref.update(payload.activity)
          .then(() => {
            commit('modifyActivity', {
              ...payload.activity,
              id: payload.id
            })
            resolve()
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },
    deleteActivity ({commit}, payload) {
      return new Promise((resolve, reject) => {
        let ref = db.collection('activities').doc(payload)
        ref.delete()
          .then(() => {
            commit('removeActivity', {
              id: payload
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
