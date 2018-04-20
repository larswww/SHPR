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
    }

  },
  actions: {
    signup({commit}, authData) {
      globalAxios.post('user/signup', authData)
        .then(res => {
          console.log(res)
          localStorage.setItem('token', res.data.token)
          commit('authUser', {token: res.data.token})
          dispatch('storeUser', authData)



        })
        .catch(e => console.error(e))
    },
    login({commit}, authData) {
      debugger
      globalAxios.post('user/login', authData)
        .then(res => {
          debugger
          console.log(res)
          localStorage.setItem('token', res.data.token)
          commit('authUser', {token: res.data.token})

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
    }
  }
})