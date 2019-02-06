import firebase from 'firebase'
import store from '../store'

var config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
};

const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.firestore()

firebase.auth().onAuthStateChanged((user) => {
  store.commit('setUser', user)

  if (user) {
    let ref = db.collection('users')

    // current user
    ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let userProfile = doc.data()
          userProfile.id = doc.id

          store.commit('setUserProfile', userProfile)
        })
      })
  } else {
    store.commit('setUserProfile', null)
  }
})

export default db
