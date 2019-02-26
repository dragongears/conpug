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
