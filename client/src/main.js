// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store.js'
import router from './router.js'
import axios from 'axios'


axios.defaults.baseURL = 'http://localhost:5000/api'
// axios.defaults.headers.common['Authorization'] = 'hej'
axios.defaults.headers.get['Accepts'] = 'application/json'

const reqInterceptor = axios.interceptors.request.use(config => {
  console.log('Request interceptor:', config)
  return config
})

const resInterceptor = axios.interceptors.response.use(res => {
  console.log('Response interceptor: ', res)
  return res
})

Vue.config.productionTip = false


// router.redirect({
//   '*': '/home'
// })

// router.start(App, '#app')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
