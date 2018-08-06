<template>
  <div>
  <div slot="header" class="toolbar">
    <q-toolbar-title :padding="1">
      Hypersign(beta)
    </q-toolbar-title>
  </div>
  <!-- Navigation Tabs -->
  <q-tabs slot="navigation">
    <q-tab icon="alarm" route="/wallet" exact replace>Wallet</q-tab>
    <q-tab icon="alarm" route="/signtx" exact replace>Scan QR</q-tab>
    <!-- <q-tab icon="help" route="/help" exact replace>Profile</q-tab>
    <q-tab icon="help" route="/sync" exact replace>sync</q-tab> -->
  </q-tabs>

  <div class="layout-padding">
    <p class="caption">SKU</p>

    <blockquote v-if="!hasITEMS">
      <small>
            Please Click on the (+) button to scan the item.
          </small>
    </blockquote>
    <div v-else class="list striped">
      <div class="item three-lines" v-if="item.direction == 'In' " v-for="(item, id) in itemsInStock">

        <div class="item-primary bg-primary text-white"><i>assignment</i></div>
        <div class="item-content has-secondary">
          <div>{{item.code}}</div>
          <div>{{item.timeStamp}}</div>
        </div>
        <div class="item-secondary stamp" style="color:green;font-weight:bold ">
          {{item.direction}}
        </div>

        <div class="item-secondary">
          <i :ref="'target' + id">
                  more_horiz
                <q-popover :ref="'popover' + id">
                  <div class="list">
                    <div class="item item-link" @click="$refs['popover' + id][0].close(), editProduct(id)">
                      <i class="item-primary">edit</i>
          <div class="item-content">Edit</div>
        </div>
        <div class="item item-link" @click="$refs['popover' + id][0].close(), deleteProduct(id)">
          <i class="item-primary">delete</i>
          <div class="item-content">Delete</div>
        </div>
      </div>
      </q-popover>
      </i>
    </div>
  </div>
</div>
</div>
<q-fab class="absolute-bottom-right cust-fab" classNames="primary" direction="up">
  <q-small-fab class="absolute-bottom-right" @click.native="signTransaction()" icon="phonelink_ring"></q-small-fab>
</q-fab>
<!-- Footer -->
<div slot="footer" class="toolbar">
  All right reserved Nano Corporation .
</div>
</div>

</template>

<script>
import { Dialog, Toast, Loading } from 'quasar'
import store from './product-store'
import userStore from '../stores/user-store'
import hsWallet from '../utils/hypersign-wallet'

export default {
  mounted(){
    // console.log(appconfig);
  },
  data(){
    return {
      urls:false,
      itemsInStock:store.state,
      userDetails:userStore.state,
      
      product:{
        name:'',
        id:''
      },
    }

  },
  methods:{
    scanQR () {
      debugger
      let  that = this;
      cordova.plugins.barcodeScanner.scan( 
        function (result) {          
          if(result.text !='')
          {   
            signTransaction("Test Raaw Message")
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
    signTransaction(rawMsg){
      rawMsg = "Message after QR scan"
      let from = this.userDetails.public_key
      if(from && rawMsg){
        Loading.show()
        let signingPromise = hsWallet.signMessageTx(from,rawMsg)
        signingPromise.then((res) => {
          let signedMsgRSV = res
          let verifyPromise = hsWallet.verifyMessageTx(rawMsg, signedMsgRSV, from)
          verifyPromise.then((res) =>{
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
      }else{
        console.log('Error : from or rawMsg is empty.')
        Toast.create.negative('Error : from or rawMsg is empty.')
      }
    }
  },
  computed: {
    hasITEMS () {
      // console.log('After setting :'+this.itemsInStock);
      // alert(store.state);
      return Object.keys(this.userDetails).length > 0
    }
  }
}
</script>

<style lang="stylus">
.cust-fab
  bottom 60px
.toolbar
  position fixed
  bottom 0
  z-index 9999
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
