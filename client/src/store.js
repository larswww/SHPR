'use strict'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import router from './router'
// import globalAxios from './axios-global'
import jwt_decode from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    userReviews: {},
    venues: {},
    masters: {
      notInitialized: true
    }
  },
  mutations: {
    authUser: (state, userData) => {
      try {
        state.token = userData.token
        state.user = jwt_decode(userData.token)
        state.user[state.user.role] = true
      } catch (e) {
        console.error('false token')
        state.user = null
        state.token = null
      }
    },

    clearAuthData (state) {
      state.user = null
      state.token = null
    },

    userReviews (state, reviewData) {
      for (let u of reviewData) state.userReviews[u.venueName] = u
    },

    venue (state, venue) {
      state.venues[venue.name] = venue
    },

    masters (state, masters) {
      state.masters = {}
      for (let m of masters) state.masters[m.name] = m
    }

  },

  actions: {
    signup ({commit}, authData) {
      axios.post('user/signup', authData) //global
        .then(res => {
          this.dispatch('user', res.data.token)
        })
        .catch(e => console.error(e))
    },
    login ({commit}, authData) {
      axios.post('user/login', authData) //gobal
        .then(res => {
          this.dispatch('user', res.data.token)
        })
        .catch(e => {console.error(e)})
    },

    logout ({commit}) {
      commit('clearAuthData')
      localStorage.removeItem('token')
      router.replace('/')
    },

    tryAutoLogin ({commit}) {
      const token = localStorage.getItem('token')
      if (!token) return
      commit('authUser', {token})
      this.dispatch('fetchReviews')
    },

    async user ({commit, state}, token) {
      localStorage.setItem('token', token)
      commit('authUser', {token})
      await this.dispatch('fetchReviews')
      router.replace('/user')
    },

    getUser ({commit, state}, userData) {
      if (!state.token) return
      axios.get('user').then(res => {
        console.log(res)
      }).catch(e => console.error('getUser', e))
    },

    async fetchVenue ({commit, state}, venueName) {
      try {
        let res = await axios.get(`venue/name/${venueName}`) //globl
        commit('venue', res.data)
      } catch (e) {
        debugger
        commit('venue', {error: true, message: e.message})
      }
    },

    async fetchReviews ({commit, state}, user) {
      const res = await axios.get('user/reviews')
      commit('userReviews', res.data)
    },

    async getMasters ({commit, state}) {
      const masters = await axios.get('venue/masterReviews')
      return commit('masters', masters.data)
    },

    review ({commit, state}, review) {
      return new Promise(async function (resolve, reject) {
        try {
          let res = await axios.post('review', review)
          resolve(res.data)
        } catch (e) {
          reject(e)
          console.error(e)
        }
      })
    },

    createVenue ({commit, state}, venueData) {
      axios.post('venue/create', venueData).then(res => {
        console.log(res)
      }).catch(e => console.error('createVenue', e))
    }
  },

  getters: {
    user (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.user !== null
    },
    token (state) {
      return state.token
    },

    venue (state) {
      return state.venues
    },

    review (state) {
      return state.userReviews
    },

    masters (state) {
      if (state.masters.notInitialized) { //empty object check
        return false
      } else {
        return state.masters
      }
    }
  }
})