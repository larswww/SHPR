import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import User from '@/components/User'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'HelloWorld',
  component: HelloWorld
},
  {
    path: '/home',
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
  }

  ]

export default new VueRouter({
  routes
})
