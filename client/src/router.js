import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

import Home from './components/Home'
import Login from './components/Login'
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
    path: '/login',
    component: Login
  },
  {
    path: '/signup',
    component: Signup
  },
  {
    path: '/user',
    component: User,
    beforeEnter (to, from, next) {
      if (store.state.token) {
        next()
      } else {
        next('/login')
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
