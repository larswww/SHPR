'use strict'
import axios from 'axios'

const instance = axios.create({
  baseUrl: 'http://localhost:5000/api'
})

axios.defaults.baseURL = 'http://localhost:5000/api'
// axios.defaults.headers.common['Authorization'] = 'hej'
axios.defaults.headers.get['Accepts'] = 'application/json'

const reqInterceptor = axios.interceptors.request.use(config => {
  console.log('Global Request interceptor:', config)
  return config
})

const resInterceptor = axios.interceptors.response.use(res => {
  console.log('Global Response interceptor: ', res)
  return res
})

export default instance