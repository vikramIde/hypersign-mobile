# Hypersign PWA Application
[Hypersign](http://www.hypermine.in/hypersign/) is a cryptography based SingleSignOn Solution that enables users to securely access [Web/Blockchain/Federated] applications without providing their access credentials [usernames and passwords].

The Application further enables a user to securely sign transactions in decentralized environments; the Hyprsign SDK allows easy authentication to the Blockchain.

# Installation

## Android 

### Ubuntu 14+

  ```
    sudo add-apt-repository ppa:nilarimogard/webupd8
    sudo apt-get update
    sudo apt-get install android-tools-adb android-tools-fastboot
  ```
  After this we will need to add the sdk tools in ANDROID_HOME

  ```
  locate platform-tools
  ```

  It should be something like 

  ```
  /home/vikram/Android/Sdk/platform-tools/
  ```

  You need to add untill SDK in variable fire the following command
  
  ```
  export ANDROID_HOME=/home/vikram/Android/Sdk
  export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
  ```
  
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
  
## Generation Signed APK

https://stackoverflow.com/a/26450074/3196956

### MacOs

https://quasar.dev/quasar-cli/developing-cordova-apps/publishing-to-store#Android-Publishing

```
./Contents/Home/bin/keytool -genkey -keystore hypersign-release-key.keystore -alias my_keystone -keyalg RSA -keysize 2048 -validity 10000
```

```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore hypersign-release-key.keystore /Users/vikrambhushan/Documents/hypersign-mobile/src-cordova/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk my_keystone
```

```
./zipalign -v 4  /Users/vikrambhushan/Documents/hypersign-mobile/src-cordova/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk Hypersign.apk
```

```
/Users/vikrambhushan/Documents/hypersign-mobile/src-cordova/platforms/android/app/build/outputs/apk/release/
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
