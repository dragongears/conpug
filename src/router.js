import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Home from './views/Home.vue'
import SignUp from './views/SignUp.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import Profiles from './views/Profiles.vue'
import Activities from './views/Activities.vue'
import Activity from './views/Activity.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/profiles',
      name: 'profiles',
      component: Profiles,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profiles/:userId',
      name: 'profile',
      component: Profile,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/activities',
      name: 'activities',
      component: Activities,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/activities/:id',
      name: 'activity',
      component: Activity,
      props: true,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// router guards
router.beforeEach((to, from, next) => {
  // check to see if route has auth guard
  if (to.matched.some(rec => rec.meta.requiresAuth)){
    // check auth state of user
    let user = firebase.auth().currentUser
    if (user) {
      // User is signed in. Proceed to route
      next()
    } else {
      // No user is signed in. Redirect to login
      next({
        name: 'login'
      })
    }
  } else {
    // if route is not guarded by auth, proceed
    next()
  }
})

export default router
