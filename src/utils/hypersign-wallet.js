import { Toast,Loading,Dialog } from 'quasar'
import Router from 'router'

var hypersign_wallet = {
    generate (password) {
        return new Promise((resolve,reject) => {
            //var form = this.form;
            //debugger
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
    addUserDet(public_key, form_data) {
        let id = Math.random().toString(36).substr(2, 9)
        userStore.set({public_key,form_data})
        debugger
        // if(userStore.state && userStore.state.length > 0){
      
        // }else {
        //   let id = Math.random().toString(36).substr(2, 9)
        //   userStore.set(id, {public_key,form_data})
        // }   
      },
      addKeyStore (key){
        let id = Math.random().toString(36).substr(2, 9)
        keyStore.set(id,{key});
      },
     addSeedStore(seed){
        let id = Math.random().toString(36).substr(2, 9)
        seedStore.set(id,{seed});
      }

}

var storeSetter = {
     
}


export default hypersign_wallet 
