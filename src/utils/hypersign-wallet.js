import { Toast,Loading,Dialog } from 'quasar'
import Router from 'router'

var hypersign_wallet = {
    generate (password) {
        return new Promise((resolve,reject) => {
            //var form = this.form;
            debugger
            if (password == '') {
                reject('Password is empty!')
            }
            let randomSeed = lightwallet.keystore.generateRandomSeed();
            ///give this randomSeed  to the user to save for restoring wallet
            console.log('Random Seed = ' +  randomSeed)            
            lightwallet.keystore.createVault({
                password: password,
                seedPhrase: randomSeed,
                hdPathString: "m/0'/0'/0'"
                }, (err, ks) => {
                    if(err) reject(err)
                    else {
                        window.key_Store = ks
                        resolve(randomSeed)
                    }
                    //this.newAddresses(password);
            })
        })
    },
    newAddresses(password, _addCnt) {
        return new Promise((resolve,reject) => {
            //debugger
            if (password == '') {
                reject('Password is empty!')
            }
            
            window.key_Store.keyFromPassword(password, (err, pwDerivedKey) => {
                //debugger
                if(err) reject(err)
                else {   
                    let numAddr = parseInt(_addCnt) //provide number of accounts you want to create
                    window.pwDerivedKey = pwDerivedKey  
                    window.key_Store.generateNewAddress(pwDerivedKey, numAddr);
                    var addresses = window.key_Store.getAddresses()
                    resolve(addresses);
                }
            })
        } )
    },
    setSeed(password, seed) {
        return new Promise((resolve, reject) => {
            /// Restoring keystore for login and restore 
            //debugger
            if (password == '') {
                reject('Password is empty!')
            }
            lightwallet.keystore.createVault({
                password: password,
                seedPhrase: seed,
                hdPathString: "m/0'/0'/0'"
                }, (err, ks) => {
                    if(err) reject(err)
                    else {
                        window.key_Store = ks
                        resolve()
                    }   
            })
        })
    },
    signMessageTx(from,rawMsg) {
        return new Promise((resolve, reject) =>{
            if(window.key_Store){
                if(window.pwDerivedKey){
                    let signedMsgRSV = lightwallet.signing.signMsg(window.key_Store, window.pwDerivedKey, rawMsg, from )
                    if(signedMsgRSV) resolve(signedMsgRSV)
                    else reject('Error : Error after singMsg call.')
                }else {
                    reject('Error : window.pwDerivedKey is null or empty.')        
                }
            }else {
                reject('Error : window.key_Store is null or empty.')    
            }
        })
    },
    verifyMessageTx(rawMessage, signedMsgRSV, publicKey){
        return new Promise((resolve, reject) => {
            let newpublicKeyUint8Arr = lightwallet.signing.recoverAddress(rawMessage, signedMsgRSV.v, signedMsgRSV.r, signedMsgRSV.s)
            let newpublicKey = this.toHexString(newpublicKeyUint8Arr)
            if(publicKey === '0x' + newpublicKey)  resolve(true)
            else reject(false)
        })
    },
    toHexString(byteArray) {
        return Array.prototype.map.call(byteArray, function(byte) {
          return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
    }
}

var storeSetter = {
     
}


export default hypersign_wallet 
