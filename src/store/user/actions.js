import { Notify } from 'quasar'

export function authenticate ({ state, commit, rootState, dispatch }, value) {
  return new Promise((resolve, reject) => {
    let password = state.password
    let res = password === value
    if (res) {
      resolve(res)
    } else {
      Notify.create({
        classes: 'text-weight-bold text-center',
        color: 'negative',
        position: 'top-right',
        message: 'Your credentials did not match.'
      })
      reject(true)
    }
  })
}
