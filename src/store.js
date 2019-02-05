import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    isLoggedIn: state => {
      return !!state.user
    }
  },
  mutations: {
    storeUser(state, payload) {
      state.user = payload
    }
  },
  actions: {

  }
})
