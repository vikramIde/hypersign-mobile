// import yoethwallet from 'yoethwallet'
import { Notify } from 'quasar'
import lightwallet from 'eth-lightwallet'
import auth from '../../api/collections/auth'
import tx from '../../api/collections/tx'

export function addSeedStore ({ commit }, value) {
  commit('UPDATE_SEEDSTORE', value)
}

export function generate ({ state, commit, rootState, dispatch }, value) {
  return new Promise((resolve, reject) => {
    let password = rootState.user.password
    let email = rootState.user.email
    let name = rootState.user.name

    if (!password || !email) {
      Notify.create({
        classes: 'text-weight-bold text-center',
        color: 'negative',
        position: 'top-right',
        message: 'Your credentials are invalid.'
      })
      reject('Password is empty!')
    }

    let randomSeed = lightwallet.keystore.generateRandomSeed()

    lightwallet.keystore.createVault({
      password: password,
      seedPhrase: randomSeed,
      hdPathString: "m/0'/0'/0'"
    }, (err, ks) => {
      if (err) reject(err)
      else {
        commit('UPDATE_KEYSTORE', ks)
        dispatch('newAddress', password)
          .then(address => {
            let apiObject = {}
            apiObject.username = name
            apiObject.email = email
            apiObject.publickey = address
            apiObject.companyid = 'playground'
            auth.registration(apiObject)
              .then(res => {
                if (res.data.status === 'SUCCESS') {
                  dispatch('addSeedStore', randomSeed)
                  resolve(randomSeed)
                  this.$router.push('/auth/login')
                } else {
                  Notify.create({
                    classes: 'text-weight-bold text-center',
                    color: 'negative',
                    position: 'top-right',
                    message: res.data.data
                  })
                  reject(res.data.data)
                }
              })
              .catch(err => {
                console.error(err)
                reject(true)
              })
          })
      }
      // this.newAddresses(password);
    })
  })
}

export function newAddress ({ state, commit }, password) {
  return new Promise((resolve, reject) => {
    // debugger
    if (password === '') {
      reject('Password is empty!')
    }
    if (typeof state.keystore.getAddresses !== 'function') {
      console.warn('getHexAddress')
      reject('getAddresses is not a function!')
    }

    state.keystore.keyFromPassword(password, (err, pwDerivedKey) => {
      // debugger
      if (err) reject(err)
      else {
        let numAddr = 1 // provide number of accounts you want to create
        state.keystore.generateNewAddress(pwDerivedKey, numAddr)
        var addresses = state.keystore.getAddresses()
        commit('UPDATE_PRIVATEKEY', pwDerivedKey)
        commit('UPDATE_ADDRESS', addresses)
        resolve(addresses)
      }
    })
  })
  // let wallet = state.keystore
  // commit('UPDATE_PRIVATEKEY', wallet.getHexPrivateKey())
  // commit('UPDATE_ADDRESS', wallet.getHexAddress(true))

  // wallet.toV3String(value.password, {}, (err, v3Json) => {
  //   if (err) {
  //     console.error(err)
  //     return
  //   }
  //   commit('UPDATE_KEYSTOREJSON', v3Json)
  //   commit('UPDATE_FILENAME', `${wallet.getV3Filename()}.json`)
  //   commit('UPDATE_KEYSTOREJSONLINK', encodeURI('data:application/json;charset=utf-8,' + state.keystoreJson))
  //   // callback()
  // })
}

export function signMessageTx ({ state, commit, dispatch }, rawMsg) {
  return new Promise((resolve, reject) => {
    // debugger
    dispatch('scanQr', rawMsg)
      .then(rawTextFromQr => {
        if (state.keystore) {
          if (state.privateKey) {
            // code to remove later
            let signedMsgRSV = lightwallet.signing.signMsg(state.keystore, state.privateKey, rawTextFromQr, state.address[0])
            if (signedMsgRSV) {
              let apiObject = {}
              apiObject.rawMsg = rawTextFromQr
              apiObject.ksSessionId = signedMsgRSV
              apiObject.challenge = signedMsgRSV
              apiObject.signedRsv = signedMsgRSV
              apiObject.publickey = state.address
              apiObject.companyid = 'playground'
              tx
                .sign(apiObject)
                .then(res => {
                  if (res.data.status === 'SUCCESS') {
                    resolve(signedMsgRSV)
                  }
                })
            } else reject('Error : Error after singMsg call.')
          } else {
            reject('Error : state.privateKey is null or empty.')
          }
        } else {
          reject('Error : state.keystore is null or empty.')
        }
      })
  })
}

export function scanQr ({ state, commit }, rawMsg) {
  return new Promise((resolve, reject) => {
    // debugger
    if (cordova.plugins) {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          if (result.text !== '') {
            try {
              Notify.create({
                classes: 'text-weight-bold text-center',
                color: 'positive',
                position: 'top-right',
                message: 'Text on QR scan : ' + result.text
              })
              resolve(result.text)
            } catch (err) {
              Notify.create({
                classes: 'text-weight-bold text-center',
                color: 'negative',
                position: 'top-right',
                message: err
              })
            }
          }
        },
        function (error) {
          alert('Scanning failed: ' + error)
        },
        {
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: true, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: false,
          prompt: 'Place a barcode inside the scan area', // Android
          resultDisplayDuration: 500
        }
      )
    } else {
      console.error('Error : cordova is not found')
      reject('Error : cordova is not found')
    }
  })
}
