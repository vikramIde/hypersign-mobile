export const generate = (password) => {
  return new Promise((resolve, reject) => {
    if (password === '') {
      reject('Password is empty!')
    }

    let randomSeed = lightwallet.keystore.generateRandomSeed()
    // give this randomSeed  to the user to save for restoring wallet
    console.log('Random Seed = ' + randomSeed)
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
}