import { axiosInstance } from '../../boot/axios'
// import fetch from 'node-fetch'

export default {
  /**
   * {
    "username":"newuser vishwas",
    "email":"bhushan@imaginea.com",
    "publickey" : "0x4b9ee8840b254bf1ec45df7802585042ac8b7f45",
    "companyid" : "playground"
    }
  */
  registration: (payload) => axiosInstance.post('register', payload)

}
