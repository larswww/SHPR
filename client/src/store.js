'use strict'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import router from './router'
import lang from './lang'
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
    },
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
      state.userReviews = {}
    },

    userReviews (state, reviewData) {
      for (let u of reviewData) state.userReviews[u.venueName.toLowerCase()] = u
    },

    venue (state, venue) {
      state.venues[venue.name.toLowerCase()] = venue
    },

    masters (state, masters) {
      state.masters = {}
      for (let m of masters) state.masters[m.name.toLowerCase()] = m
    },

    setLang (state, locale) {
      lang.locale = locale
      state.language = locale
    }

  },

  actions: {
    async signup ({commit}, authData) {
      const res = await axios.post('user/signup', authData) //global
      await this.dispatch('user', res.data.token)
    },
    async login ({commit}, authData) {
      try {
        const res = await Vue.http.post('user/login', authData)
        await this.dispatch('user', res.data.token)
      } catch (e) {
        console.error(e)
      }

    },

    logout ({commit}) {
      commit('clearAuthData')
      localStorage.removeItem('token')
      router.replace('/')
    },

    async tryAutoLogin ({commit}) {
      const token = localStorage.getItem('token')
      if (!token) return
      commit('authUser', {token})
      await this.dispatch('fetchReviews')
    },

    async user ({commit, state}, token) {
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      commit('authUser', {token})
      const res = await this.dispatch('fetchReviews')
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
        commit('venue', {error: true, message: e.message})
      }
    },

    async fetchReviews ({commit, state}, user) {
      try {
        const res = await axios.get('user/reviews')
        commit('userReviews', res.data)
      } catch (e) {
        console.error(e)
      }

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
    },

    async setLang ({commit}, locale) {
      localStorage.setItem('language', locale)
      axios.defaults.headers.common['Language'] = locale
      commit('setLang', locale)
      await this.dispatch('getMasters')
    },

    photos({commit}, formData) {

      return axios.post('venue/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      // get data
        .then(x => x.data)
        // add url field
        // .then(x => x.map(img => Object.assign({},
        //   img, { url: `${BASE_URL}/images/${img.id}` })));
    }

  },

  getters: {
    user (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.user !== null
    },

    isAdmin (state) {
      if (!state.user || !state.user.role) return false
      return state.user.role === 'ADMIN'
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
    },

  }
})