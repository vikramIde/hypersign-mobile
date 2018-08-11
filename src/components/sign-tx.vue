<template>
  <div>
  <div slot="header" class="toolbar">
    <q-toolbar-title :padding="1">
      Hypersign(beta)
    </q-toolbar-title>
  </div>
  <!-- Navigation Tabs -->
  <q-tabs slot="navigation">
    <q-tab icon="account_balance_wallet" route="/wallet" exact replace>Wallet</q-tab>
    <q-tab icon="line_weight" route="/signtx" exact replace>Scan QR</q-tab>
    <!-- <q-tab icon="help" route="/help" exact replace>Profile</q-tab>
    <q-tab icon="help" route="/sync" exact replace>sync</q-tab> -->
  </q-tabs>

  <div class="layout-padding">
    <p class="caption">Tx's</p>

    <blockquote v-if="!hasITEMS">
      <small>
            Please Click on the (+) button to scan the item.
          </small>
    </blockquote>
    <div v-else class="list striped">
      <div class="item three-lines" v-if="item.direction == 'Login' " v-for="(item, id) in txDetails">

        <div class="item-primary bg-primary text-white"><i>Login Attempt</i></div>
        <div class="item-content has-secondary">
          <div>{{item.id}}</div>
        </div>
        <div class="item-secondary stamp" style="color:green;font-weight:bold ">
          {{item.direction}}
        </div>

        <div class="item-secondary">
          
        </div>
      </div>
      -------------------------------------------------------------------------------------
      <div class="item three-lines" v-if="item.direction == 'Txs' " v-for="(item, id) in txDetails">

        <div class="item-primary bg-primary text-white"><i>Tx- </i></div>
        <div class="item-content has-secondary">
          <div>{{item.id}}</div>
        </div>
        <div class="item-secondary stamp" style="color:green;font-weight:bold ">
          {{item.direction}}
        </div>

        <div class="item-secondary">
          
        </div>
      </div>
    </div>
  </div>
  <q-fab
    class="absolute-bottom-right cust-fab"
    @click="alert()"
    classNames="primary"
    active-icon="alarm"
    direction="up"
    style="right: 18px; bottom: 18px;"
  >
    <q-small-fab class="purple" @click.native="scanQrLogin('mail')" icon="phonelink_ring"></q-small-fab> 
    <!--<q-small-fab class="purple" @click.native="signMessageTx('mail')" icon="phonelink_ring"></q-small-fab>-->
    <q-small-fab class="secondary" @click.native="scanQrTransaction('alarm')" icon="payment"></q-small-fab>
  </q-fab>


  <!-- Footer -->
  <div slot="footer" class="toolbar">
    All right reserved Hypermine Technologies .
  </div>
</div>
</template>


<script>
import { Dialog, Toast, Loading } from 'quasar'
import store from './product-store'
import userStore from '../stores/user-store'
import txDetailStore from '../stores/tx-store'
import hsWallet from '../utils/hypersign-wallet'
import axios from 'axios'
var CryptoJS = require("crypto-js");

function addTxDet(txdetail) {
  let id = Math.random().toString(36).substr(2, 9)

  txDetailStore.set(id, txdetail)
  Toast.create.positive('Successfully registered!')
}

export default {
  mounted(){
    // console.log(appconfig);
  },
  data(){
    return {
      urls:false,
      itemsInStock:store.state,
      userDetails:userStore.state,
      txDetails:txDetailStore.state,
      urlToValidateSign:'https://obscure-woodland-78571.herokuapp.com/appLogin',
      urlToNotifyTransaction:'https://obscure-woodland-78571.herokuapp.com/notifyTx'
    }

  },
  methods:{
    scanQrLogin () {
      let  that = this;
      cordova.plugins.barcodeScanner.scan( 
        function (result) {          
          if(result.text !='')
          { 
            try{
                Toast.create.positive('Text on QR scan : ' + result.text)
                // let qrData = JSON.parse(result.text);
                that.signMessageTx(result.text)
                //addTxDet(qrData)
            }
            catch(err){
              Toast.create.negative('Error : ' + err)
            }
            
          }
        },
        function (error) {
            alert("Scanning failed: " + error);
        },
        {
            preferFrontCamera : false, // iOS and Android
            showFlipCameraButton : true, // iOS and Android
            showTorchButton : true, // iOS and Android
            torchOn: false, 
            prompt : "Place a barcode inside the scan area", // Android
            resultDisplayDuration: 500
        }
      )
    },
    scanQrTransaction () {
      let  that = this;
      cordova.plugins.barcodeScanner.scan( 
        function (result) {          
          if(result.text !='')
          { 
            Toast.create.positive('Tx : ' + result.text)
            let qrData = that.processRawTxFromQR(result.text)
            that.signRawTx(qrData)
            // addTxDet(result.text)
          }
        },
        function (error) {
            alert("Scanning failed: " + error);
        },
        {
            preferFrontCamera : false, // iOS and Android
            showFlipCameraButton : true, // iOS and Android
            showTorchButton : true, // iOS and Android
            torchOn: false, 
            prompt : "Place a barcode inside the scan area", // Android
            resultDisplayDuration: 500
        }
      )
    },
    processRawTxFromQR(rawTx){
      // rawTx = "U2FsdGVkX1+jLpz6rG+IZdATG1GgoF72KHrb29aoGNMwvSv3azuDV1Mjzrnqfz7rwfR7fwkMJPNHT2OxjVJ8BZh/TwNvpSKfKCMZt53RyCUoqwxpZ2MyZ7ZoKQf5+X1cnqdpaWIwvY3+M5Dhir+2hJnXfsTEbOENYOxDG78dW/JTaNDWpKtgvhzeses+QngmHoYzdSOAPxqn60+Q3bghHPp2y2nJ8gv1kAvxPWuqV8nqzqhLGPOybekkl2QwxCQcw/IJXtg4xn/LqCWobV/9jhtiyTuTHnH5zdyDhoZlqSoo1vA6PYnj6BFKZgEjDgNOZzH0L0CcuGUCrG+iDiU+MXu9+CbxCOZ0kQb0w8QkTpBtrGlW/LsSf8AV26kzDVA/+mpI7ESyJoXzdR3W3HoL5w=="

      var bytes  = CryptoJS.AES.decrypt(rawTx, 'secret key 123');
      var plaintext = bytes.toString(CryptoJS.enc.Utf8);
      let qrData = JSON.parse(plaintext).rawTx
      return qrData
    },
    signMessageTx(rawMsg){
      // debugger
      // rawMsg = {"message":"Hello"}
      // rawMsg = JSON.stringify(rawMsg)
      let from = this.userDetails.public_key
      if(from && rawMsg){
        Loading.show()
        let signingPromise = hsWallet.signMessageTx(from,rawMsg)
        signingPromise.then((res) => {
          let signedMsgRSV = res
          this.verifyMessageApiCall(rawMsg, signedMsgRSV, from)
          .then((res) =>{
            Loading.hide()
            if(res) Toast.create.positive('Message successfully signed.')
          } , (err) => {
            if(!err) Toast.create.negative('Error : Promise rejected in verify.')
            Loading.hide()
          })
        }, (err) => {
          Toast.create.negative('Error : ' + err)
          Loading.hide()
        })
        .catch((err) => {
          Toast.create.negative('Error : in catch : Message =  ' + err)
          Loading.hide()
        })
      }else{
        console.log('Error : from or rawMsg is empty.')
        Toast.create.negative('Error : from or rawMsg is empty.')
      }
    },
    signRawTx(rawMsg){
      
      //debugger
      rawMsg = this.processRawTxFromQR(rawMsg)
      let from = this.userDetails.public_key
      if(from && rawMsg){
        Loading.show()
        let signingPromise = hsWallet.signTx(from,rawMsg)
        signingPromise.then((res) => {
          Toast.create.positive('Transaction signed : ' + res)
          let signedMsgRSV = res
          this.notifyTxApiCall(rawMsg, signedMsgRSV, from)
          .then((res) =>{
            Loading.hide()
            if(res) Toast.create.positive('Message successfully signed.')
          } , (err) => {
            if(!err) Toast.create.negative('Error : Promise rejected in verify.')
            Loading.hide()
          })
        }, (err) => {
          //debugger
          Toast.create.negative('Error : ' + err)
          Loading.hide()
        })
        .catch((err) => {
          //debugger
          Toast.create.negative('Error : in catch : Message =  ' + err)
          Loading.hide()
        })
      }else{
        console.log('Error : from or rawMsg is empty.')
        Toast.create.negative('Error : from or rawMsg is empty.')
      }
    },
    verifyMessageApiCall(rawMsg,signedMsgRSV,from)
    {
      return new Promise((resolve,reject) => {
        try{
            
            let data={
                      "data": {
                        "attributes": {
                          "companyId": 21,
                          "signedRsv":signedMsgRSV,
                          "publicToken": from,
                          "rawMsg":rawMsg
                        }
                      }
                    }
            console.log("Hello",JSON.stringify(data))
            axios.post(this.urlToValidateSign,data)
            .then(e=> {
              resolve(e)
            })
            .catch(e =>{
              Toast.create.negative('Error =' + e)  
              resolve(false)
            })

            
        }
        catch(err){
          Toast.create.negative('Error =' + err)  
          resolve(false)
        }
        
       });
    },
    notifyTxApiCall(rawMsg,signedMsgRSV,from)
    {
      return new Promise((resolve,reject) => {
        try{
            
            let data={
                      "data": {
                        "attributes": {
                          "companyId": 21,
                          "signedRsv":signedMsgRSV,
                          "publicToken": from,
                          "rawMsg":rawMsg
                        }
                      }
                    }
            console.log("Hello",JSON.stringify(data))
            axios.post(this.urlToNotifyTransaction,data)
            .then(e=> {
              resolve(e)
            })
            .catch(e =>{
              Toast.create.negative('Error =' + e)  
              resolve(false)
            })

            
        }
        catch(err){
          Toast.create.negative('Error =' + err)  
          resolve(false)
        }
        
       });
    }
  },
  computed: {
    hasITEMS () {
      // console.log('After setting :'+this.itemsInStock);
      // alert(store.state);
      return Object.keys(this.txDetails).length > 0
    }
  }
}
</script>

<style lang="stylus">
.cust-fab
  bottom 60px !important
.toolbar
  position fixed
  bottom 0
.logo-container
  width 192px
  height 268px
  perspective 800px
  position absolute
  top 50%
  left 50%
  transform translateX(-50%) translateY(-50%)
.logo
  position absolute
  transform-style preserve-3d
</style>
