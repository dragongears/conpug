import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: null,
    user: null,
    userProfile: null
  },
  mutations: {
    setDrawer(state, payload) {
      state.drawer = payload
    },
    setUser(state, payload) {
      state.user = payload
    },
    setUserProfile(state, payload) {
      state.userProfile = payload
    }
  },
  actions: {

  }
})
