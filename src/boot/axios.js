import axios from 'axios'
import { Notify } from 'quasar'
let notif = () => void 0

const axiosInstance = axios.create({
  baseURL: process.env.API,
  timeout: 5000 // request timeout
})

/**
 * Used for intercepting axios requests and responses
 * and logging it in the console, useful when in dev
 */
// eslint-disable-next-line
const defaultInterceptor = store => {
  // register a standard request interceptor
  axiosInstance.interceptors.request.use(
    config => {
      // Do something before request is sent
      console.log(
        '%c[REQUEST] sent -> ' + config.url,
        'color: blue; font-weight: bold;',
        config
      )
      return config
    },
    error => {
      // Do something with request error
      console.log(
        '%c[REQUEST] error -> ' + error.config.url,
        'color: red; font-weight: bold;',
        error.message || error
      )
      return Promise.reject(error)
    }
  )
  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    response => {
      // Do something with response data
      console.log(
        '%c[RESPONSE] received -> ' + response.config.url,
        'color: green; font-weight: bold;',
        response
      )
      notif()
      notif = Notify.create({
        color: 'positive',
        icon: 'mdi-check',
        message: response.data.data,
        timeout: 1500
      })
      return response
    },
    error => {
      // Do something with response error
      console.log(
        '%c[RESPONSE] error ->' + error.config.url,
        'color: red; font-weight: bold;',
        error.response || error.message
      )
      notif()
      notif = Notify.create({
        color: 'negative',
        icon: 'mdi-alert-circle-outline',
        message: error.response ? error.response.data.msg : error.message,
        timeout: 2000
      })
      // return the error object
      return Promise.reject(error)
    }
  )
}

export default async ({ Vue, store }) => {
  defaultInterceptor(store)
  Vue.prototype.$axios = axiosInstance
}

export { axiosInstance }
