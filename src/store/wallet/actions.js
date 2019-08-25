import yoethwallet from 'yoethwallet'
import { Notify } from 'quasar'

export function addSeedStore ({ commit }, value) {
  commit('UPDATE_SEEDSTORE', value)
}

export function generate ({ state, commit, rootState, dispatch }, value) {
  let password = rootState.user.password
  let email = rootState.user.email

  if (!password || !email) {
    Notify.create({
      classes: 'text-weight-bold text-center',
      color: 'negative',
      position: 'top-right',
      message: 'Your credentials are invalid.'
    })
    return
  }

  let wallet = yoethwallet.wallet

  wallet.generate('', state.hdPathString, (err, keystore) => {
    if (err) {
      console.warn(err.message)
      return
    }

    commit('UPDATE_KEYSTORE', keystore)
    dispatch('newAddress', { password })
    this.$router.push('/auth/login')
  })
}

export function newAddress ({ state, commit }, value) {
  if (typeof state.keystore.getHexAddress !== 'function') {
    console.warn('getHexAddress')
    return false
  }

  let wallet = state.keystore
  commit('UPDATE_PRIVATEKEY', wallet.getHexPrivateKey())
  commit('UPDATE_ADDRESS', wallet.getHexAddress(true))

  wallet.toV3String(value.password, {}, (err, v3Json) => {
    if (err) {
      console.error(err)
      return
    }
    commit('UPDATE_KEYSTOREJSON', v3Json)
    commit('UPDATE_FILENAME', `${wallet.getV3Filename()}.json`)
    commit('UPDATE_KEYSTOREJSONLINK', encodeURI('data:application/json;charset=utf-8,' + state.keystoreJson))
    // callback()
  })
}
