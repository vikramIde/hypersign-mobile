# Hypersign PWA Application
[Hypersign](http://www.hypermine.in/hypersign/) is a cryptography based SingleSignOn Solution that enables users to securely access [Web/Blockchain/Federated] applications without providing their access credentials [usernames and passwords].

The Application further enables a user to securely sign transactions in decentralized environments; the Hyprsign SDK allows easy authentication to the Blockchain.

## **Installation**
- clone the repo
- Install dependancies via yarn or npm
- Start dev server:

```$ quasar dev```

## Fix the bitcore-lib issue

 go to node_modules/bitcore-mnemonic/node_modules/bitcore-lib/index.js and comment following line

 ```
 // if (version !== undefined) {
  //   var message = 'More than one instance of bitcore-lib found. ' +
  //     'Please make sure to require bitcore-lib and check that submodules do' +
  //     ' not also include their own bitcore-lib dependency.';
  //   throw new Error(message);
  // }
  ```
  

## **Technologies**
#### [Vue v3.x](https://vuejs.org/)
#### [Quasar v1.x](https://v1.quasar-framework.org/)

## **Quasar Application Extensions**
#### [dotenv](https://github.com/quasarframework/app-extension-dotenv)
#### [qenv](https://github.com/quasarframework/app-extension-qenv)

## **Code Documentation**
#### JS Doc

## **Testing**
> Derived from Quasar's testing application extension. Follow the links for each section for more information
#### [E2E](http://www.hypermine.in/hypersign/)
#### [Unit](https://testing.quasar-framework.org/#unit-testing)
#### [Quality & Security](https://testing.quasar-framework.org/#quality-auditing)
