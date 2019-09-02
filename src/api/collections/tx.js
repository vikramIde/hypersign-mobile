import { axiosInstance } from '../../boot/axios'

export default {
  /**
   * {
      "companyId": "playground",
      "publicKey": "0x4b9ee8840b254bf1ec45df7802585042ac8b7f45",
      "signedRsv": "{\"r\":{\"type\":\"Buffer\",\"data\":[252,54,228,125,123,61,165,211,220,106,188,36,132,83,24,198,222,145,14,60,130,34,7,130,242,181,168,104,39,193,139,168]},\"s\":{\"type\":\"Buffer\",\"data\":[6,1,54,181,191,79,237,172,147,118,175,34,9,190,1,74,24,18,44,149,49,111,23,238,72,153,98,207,249,42,167,16]},\"v\":27}",
      "rawMsg": "Quick Brown Fox Jump Over a Lazy Dog",
      "ksSessionId" : "my_new_session123",
      "challenge" : "62d19600-ccaa-11e9-8e6e-c30f5e42b2be"
      }
    */
  sign: (payload) => axiosInstance.post('/sign', payload)
}
