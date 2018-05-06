'use strict'
import axios from 'axios'
import store from './store'

const instance = axios.create({
  baseUrl: 'http://128.199.164.210/api'
})

instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
axios.defaults.headers.get['Accepts'] = 'application/json'

const reqInterceptor = axios.interceptors.request.use(config => {
  console.log('Auth Request Interceptor', config)
  return config
})
const resInterceptor = axios.interceptors.response.use(res => {
  console.log('Auth Response Interceptor', res)
  return res
})

export default instance
