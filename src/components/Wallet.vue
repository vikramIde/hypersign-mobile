<template>
  <q-layout>
     <!-- Header -->
  <div slot="header" class="toolbar">
    <q-toolbar-title :padding="1">
      Hypersign (beta)
    </q-toolbar-title>
  </div>
  <!-- Navigation Tabs -->
  <q-tabs slot="navigation">
    <q-tab icon="alarm" route="/stockin" exact replace>Wallet</q-tab>
    <q-tab icon="alarm" route="/signtx" exact replace>Scan QR</q-tab>
    <!-- <q-tab icon="help" route="/help" exact replace>Profile</q-tab>
    <q-tab icon="help" route="/sync" exact replace>sync</q-tab> -->
  </q-tabs>
  <!-- IF USING subRoutes only: -->
  <!-- <router-view class="layout-view"></router-view> -->
  <!-- OR ELSE, IF NOT USING subRoutes: -->
  <div class="layout-padding">
      <blockquote v-for="(item, id) in userDetails" :key = "id">
          <b>Account : </b> 
          <small>
            {{ item.public_key }}
          </small>

          <b>User Name : </b> 
          <small>
            {{ item.form_data.username }}
          </small>

      </blockquote>
      
  </div>


  <!-- Footer -->
  <div slot="footer" class="toolbar">
    All right reserved Nano Corporatio 
  </div>
  </q-layout>
</template>

<script>
import store from './product-store'
import userStore from './user-store'
import { Toast,Loading,Dialog } from 'quasar'
import Router from 'router'
    // var web3 = new Web3();
    var global_keystore;
    function gotNoFileEntry(e) {
        console.log(e);
        Router.replace({ path: 'help' })
        // Dialog.create({
        //     title: 'Confirm',
        //     message: 'Select option to progress..',
        //     buttons: [
        //       {
        //         label: 'Continue',
        //         handler () {
        //           Router.replace({ path: 'help' })
        //         }
        //       }
        //     ]
        // })
    }

    function addUserDet(public_key, user_name) {
      let id = Math.random().toString(36).substr(2, 9)

      userStore.set(id, {public_key,user_name})
      Toast.create.positive('Successfully registered!')
    }

    function onFileSystemSuccess(fileSystem) {

        fileSystem.getDirectory('batch', {
            create: false,
            exclusive: false
        }, onGetDirectorySuccess, onGetDirectoryFail);
    }

    function onGetDirectorySuccess(dir,directury) {
        dir.getFile('product.json', {
            create: false,
            exclusive: false
        }, gotFileEntry, gotNoFileEntry);
    }

    function gotFileEntry(dir){

      Dialog.create({
          title: 'Confirm',
          message: 'Select option to progress..',
          buttons: [
            {
              label: 'Synch',
              handler () {
                Router.replace({ path: 'sync' })
              }
            },
            {
              label: 'Continue',
              handler () {
                Router.replace({ path: 'stockin' })
              }
            }
          ]
      })

    }

    function onGetDirectoryFail(err)
    {
      console.log('Direcotory Error :'+err);
    }

export default {
  mounted(){
    debugger
      console.log('Componenet Mounted');
      const url = appconfig.dev.BASE_URL+'/api/product_check_in/';
      console.log(this.userDetails)
      this.checkFile();
  },
  data () {
    return {
        itemsInStock:store.state,
        userDetails : userStore.state,
        form:{username:'',password:'',email:''}
    }
  },
  computed: {
    // hasITEMS () {
    //    if(this.itemsInStock.length<0)
    //    {
    //       this.getProductSku();
    //    }
    //    else{
    //       console.log('itemsInStock available')
    //    }
    // }
  },
  methods: {
  generate () {
    
    var form = this.form;
    debugger
    var randomSeed = lightwallet.keystore.generateRandomSeed();
    //give  this randomSeed  to the user to save
    console.log('Random Seed = ' +  randomSeed)
    var password = form.password
    lightwallet.keystore.createVault({
        password: password,
        seedPhrase: randomSeed,
        //random salt 
        hdPathString: "m/0'/0'/0'"
      }, (err, ks) => {
        debugger
        global_keystore = ks
                
        this.newAddresses(password);
        //setWeb3Provider(global_keystore);
        //getBalances();
    })
  },

  newAddresses (password) {
        debugger
        if (password == '') {
          password = prompt('Enter password to retrieve addresses', 'Password');
        }

        var numAddr = parseInt(1) //provide number of accounts you want to create

        global_keystore.keyFromPassword(password, function(err, pwDerivedKey) {
            debugger
            global_keystore.generateNewAddress(pwDerivedKey, numAddr);

            var addresses = global_keystore.getAddresses()
            for (var i=0; i<addresses.length; ++i) {
              
              Router.replace({ path: 'help' })
              console.log('Address = ' + addresses[i])
            }

            //getBalances();
         })
      },
  
    testMethod () {
        console.log('console.log(cordova): %O', cordova)
    },
    getProductSku() {
      Loading.show();
      const url = appconfig.dev.BASE_URL+`/get_shankar_products/`;
       axios.get(url).then(response => {
        response.data.forEach(function(item){

            addProduct(item._sku,item._barcode,item.movement,item.id,item.updated_at,item.created_at)

        });
        Loading.hide()
        Toast.create.positive('Product added')
        // console.log(store);
      });
    },
    checkFile(){
       window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
            console.log('got main dir',dir);
            try{
                onFileSystemSuccess(dir,'fileName');
            }
            catch(err){
              console.log(err);
            }
            
        });
    }
  }
}
</script>

<style lang="stylus">
.error-page
  .error-code
    height 50vh
    width 100%
    padding-top 4vh
    font-size 21vmax
    color rgba(255, 255, 255, .2)
    overflow hidden
  .error-card
    margin-top -25px
    width 90vw
    max-width 600px
    padding 50px
    i
      font-size 5rem
</style>
