'use strict'
import axios from 'axios'
import store from './store'

const instance = axios.create({
  baseUrl: process.env.base_url + '/api/'
})

let city = 'shanghai'
if (window.location.hostname.indexOf('.')) city = window.location.hostname.split('.')[0]
axios.defaults.headers.get['Accepts'] = 'application/json'
axios.defaults.baseURL = process.env.base_url + '/api/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
axios.defaults.headers.common['Language'] = localStorage.getItem('language') || 'cn'


const reqInterceptor = axios.interceptors.request.use(config => {
  console.log('Auth Request Interceptor', config)
  return config
})
const resInterceptor = axios.interceptors.response.use(res => {
  console.log('Auth Response Interceptor', res)
  return res
})

export default instance
