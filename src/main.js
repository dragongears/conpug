import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/firebase/init'
import firebase from 'firebase'

Vue.config.productionTip = false

let app = null
// const config = {
//   apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
//   authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
// }
//
// firebase.initializeApp(config)

// wait for firebase auth to init before creating the app
firebase.auth().onAuthStateChanged(() => {

  // init app if not already created
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

})

