// import yoethwallet from 'yoethwallet'
import { Notify } from 'quasar'
import lightwallet from 'eth-lightwallet'
// import auth from '../../api/collections/auth'
import tx from '../../api/collections/tx'

export function addSeedStore ({ commit }, value) {
  commit('UPDATE_SEEDSTORE', value)
}

function bufferToString (buf) {
  var view = new Uint8Array(buf)
  return Array.prototype.join.call(view, ',')
}
// Converts a comma-separated ASCII ordinal string list
//  back to an ArrayBuffer (see note for bufferToString())
function stringToBuffer (str) {
  var arr = str.split(','), view = new Uint8Array(arr)
  return view.buffer
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
        window.ks = ks
        commit('UPDATE_KEYSTORE', ks.serialize())
        dispatch('newAddress', password)
          .then(address => {
            dispatch('addSeedStore', randomSeed)
            this.$router.push('/')
            let apiObject = {}
            apiObject.username = name
            apiObject.email = email
            apiObject.publickey = address[0]
            apiObject.companyid = 'master'
            // auth.registration(apiObject)
            //   .then(res => {
            //     if (res.data.status === 'SUCCESS') {
            //       dispatch('addSeedStore', randomSeed)
            //       resolve(randomSeed)
            //       this.$router.push('/')
            //     } else {
            //       Notify.create({
            //         classes: 'text-weight-bold text-center',
            //         color: 'negative',
            //         position: 'top-right',
            //         message: res.data.data
            //       })
            //       reject(res.data.data)
            //     }
            //   })
            //   .catch(err => {
            //     console.error(err)
            //     reject(true)
            //   })
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

    let ks = lightwallet.keystore.deserialize(state.keystore)
    if (typeof ks.getAddresses !== 'function') {
      console.warn('getHexAddress')
      reject('getAddresses is not a function!')
    }
    ks.keyFromPassword(password, (err, pwDerivedKey) => {
      if (!ks.isDerivedKeyCorrect(pwDerivedKey)) {
        throw new Error('Incorrect derived key!')
      }

      if (err) reject(err)
      else {
        let numAddr = 1 // provide number of accounts you want to create
        ks.generateNewAddress(pwDerivedKey, numAddr)
        var addresses = ks.getAddresses()
        // var pvtkey = new TextDecoder("utf-8").decode(pwDerivedKey);
        let str = bufferToString(pwDerivedKey.buffer)

        commit('UPDATE_PRIVATEKEY', str)
        commit('UPDATE_ADDRESS', addresses)
        resolve(addresses)
      }
    })
  })
  // let wallet = ks
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
    let rawTextFromQr = '{"kcSessionId":"d393cbbd-d116-4108-9e2d-26ba7300f044", "companyId" : "master", "hsSessionId" : "13546810-ec48-11e9-8599-cdf76fd1f555"}'
    // let rawTextFromQr = 'Quick Brown Fox Jump Over a Lazy Dog'
    let ks = lightwallet.keystore.deserialize(state.keystore)
    // let buf = stringToBuffer(state.privateKey)
    // let privateKey = new Uint8Array(buf)
    let privateKey = new Uint8Array(buf)
    // dispatch('scanQr', rawMsg)
    //   .then(rawTextFromQr => {
    if (state.keystore) {
      if (state.privateKey) {
        // code to remove later
        // let ks = window.ks
        console.log(state, 'state')
        console.log(state.keystore, 'keystore')
        console.log(ks, 'ks')
        console.log(privateKey, 'privateKey')
        console.log(rawTextFromQr, 'rawTextFromQr')
        console.log(state.address[0], 'state.address[0]')
        console.log(typeof ks)
        console.log(ks.getAddresses())
        console.log(ks.generateNewAddress(privateKey, 1))
        // if (typeof ks.keyFromPassword !== 'function') {
        if (!ks.generateNewAddress(privateKey, 1)) {
          throw new Error('Incorrect derived key!')
        }
        debugger
        let signedMsgRSV = lightwallet.signing.signMsg(ks, privateKey, rawTextFromQr, state.address[0])
        if (signedMsgRSV) {
          let apiObject = {}
          // debugger
          let scannedMsg = JSON.parse(rawTextFromQr)
          debugger
          apiObject.rawMsg = rawTextFromQr
          apiObject.ksSessionId = scannedMsg.kcSessionId
          apiObject.challenge = scannedMsg.hsSessionId
          apiObject.signedRsv = signedMsgRSV
          apiObject.publickey = state.address
          apiObject.companyid = 'master'
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
      reject('Error : ks is null or empty.')
    }
    // })
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
