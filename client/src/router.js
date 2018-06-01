import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

import Home from './components/Home'
import Signup from './components/Signup'
import User from './components/User'
import CreateVenue from './components/CreateVenue'
import Venue from './components/Venue'
import Review from './components/Review'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/signup',
    component: Signup
  },
  {
    path: '/user',
    component: User,
    beforeEnter (to, from, next) {
      if (store.state.user) {
        next()
      } else {
        next('/signup')
      }
    }
  },
  {
    path: '/createVenue',
    component: CreateVenue
  },
  {
    path: '/venue/:name',
    component: Venue

  },
  {
    path: '/venue/:name/review',
    component: Review
  }

]

export default new VueRouter({
  routes
})
