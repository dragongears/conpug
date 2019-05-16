import firebase from 'firebase'
import store from '../store'
import router from '../router'
import spacetime from 'spacetime'

var config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
}

const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.firestore()

firebase.auth().onAuthStateChanged((user) => {
  store.commit('setUser', user)

  if (user) {
    const ref = db.collection('users')

    // current user
    ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let userProfile = doc.data()
          userProfile.id = doc.id
          userProfile.mostRecentLoginDateTime = spacetime.now().format('iso')

          store.commit('setUserProfile', userProfile)
          store.dispatch('updateUserProfile', userProfile)
          router.replace({name: 'profile', params: { id: doc.id }})
        })
      })
    const collection = db.collection('users')
    const unsubscribe = collection.onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let profile = doc.data()
          profile.id = doc.id
          store.commit('modifyProfile', profile)
          console.log(`Updated locally from Firestore: ${profile.name}`)
        })
      })
    store.commit('setUnsubscribe', unsubscribe)
    store.dispatch('loadActivities')
  } else {
    console.log('No user')
    store.commit('setUserProfile', null)
    router.replace({name: 'home'})
  }
})

export default db
