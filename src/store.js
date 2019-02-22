import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import db from './firebase/init'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    drawer: null,
    user: null,
    userProfile: null,
    loadedActivities: []
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
    }
  },
  actions: {
    loadActivities ({commit}) {
      commit('setLoading', true)
      db.collection('activities').get()
        .then((querySnapshot) => {
          const activities = []
          querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`)
            const obj = doc.data()
            activities.push({
              id: doc.id,
              name: obj.name,
              location: obj.location,
              summary: obj.summary,
              description: obj.description,
              startDateTime: obj.startDateTime,
              endDateTime: obj.endDateTime
            })
          })
          commit('setLoadedActivities', activities)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoadedActivities', [])
          commit('setLoading', false)
        })
    },
    createActivity ({commit}, payload) {
      db.collection('activities').add(payload)
        .then((data) => {
          const key = data.key
          commit('addActivity', {
            ...payload,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },

  },
  getters: {
    loadedActivities (state) {
      return state.loadedActivities.sort((activityA, activityB) => {
        return activityA.date > activityB.date
      })
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
