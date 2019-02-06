import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    userProfile: null
  },
  mutations: {
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
