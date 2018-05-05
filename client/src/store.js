'use strict'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import router from './router'
import globalAxios from 'axios'
import jwt_decode from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    userReviews: {},
    venues: {},
    masters: null
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

    clearAuthData(state) {
      state.user = null
      state.token = null
    },

    userReviews(state, reviewData) {
      state.userReviews[reviewData._id] = reviewData
    },

    venue(state, venue) {
      state.venues[venue.name] = venue
    },

    masters(state, masters) {
      state.masters = masters
    }


  },
  actions: {
    signup({commit}, authData) {
      globalAxios.post('user/signup', authData)
        .then(res => {
          console.log(res)
          localStorage.setItem('token', res.data.token)
          commit('authUser', {token: res.data.token})
          this.dispatch('storeUser', authData)



        })
        .catch(e => console.error(e))
    },
    login({commit}, authData) {
      globalAxios.post('user/login', authData)
        .then(res => {
          debugger
          console.log(res)
          localStorage.setItem('token', res.data.token)
          commit('authUser', {token: res.data.token})
          this.dispatch('fetchReviews')
          router.replace('/user')

        })
        .catch(e => {console.error(e)})
    },

    logout({commit}) {
      commit('clearAuthData')
      localStorage.removeItem('token')
      router.replace('/')
    },

    tryAutoLogin ({commit}) {
      const token = localStorage.getItem('token')
      if (!token) return
      commit('authUser', {token: token})
      this.dispatch('fetchReviews')

    },

    storeUser({commit, state}, userData) {
      if (!state.token) return
      globalAxios.post()
    },

    getUser({commit, state}, userData) {
      if (!state.token) return
      axios.get('user').then(res => {
        console.log(res)
      }).catch(e => console.error('getUser', e))
    },

    async fetchVenue({commit, state}, venueName) {
      try {
        let res = await globalAxios.get(`venue/${venueName}`)
        commit('venue', res.data)
      } catch (e) {
        commit('venue', {error: true, message: e.message})
      }
    },

    fetchReviews({commit, state}, user) {
      axios.get('user/reviews')
        .then(res => {
          commit('userReviews', res.data)
        }).catch(e => {

      })
    },

    async getMasters({commit, state}) {
      if (state.masters) return state.masters
      const masters = await axios.get('venue/masterReviews')
      commit('masters', masters.data)
    },

    review({commit, state}, review) {
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

    createVenue({commit, state}, venueData) {
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
      return state.masters
    }
  }
})