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
  <q-small-fab class="absolute-bottom-right" @click.native="triggerSignTx()" icon="phonelink_ring"></q-small-fab>
</q-fab>
<!-- Footer -->
<div slot="footer" class="toolbar">
  All right reserved Nano Corporation .
</div>
</div>

</template>

<script>
import { Dialog, Toast } from 'quasar'
import store from './product-store'
import userStore from './user-store'
// import keyStore from './key-store'

function addProduct (name,code,direction='in',timeStamp) {
  let id = Math.random().toString(36).substr(2, 9)

  store.set(id, {name,code,direction,timeStamp})
  Toast.create.positive('Product added')
}
  
function onGetDirectoryFail()
{
  alert('Folder batch Doesnot Exist');
}

function gotNoFileEntry()
{
  alert('Product.json Does not exist');
}

function writeFile(fileEntry,dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            // readFile(fileEntry);
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['some file data'], { type: 'text/plain' });
        }

        fileWriter.write(JSON.stringify(dataObj));

    });
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
      
      product:{
        name:'',
        id:''
      },
    }

  },
  methods:{
    scanQR () {
      let  that = this;
      cordova.plugins.barcodeScanner.scan( 
        function (result) {
            // console.log('inside result')
            if(result.text !='')
            {
                // console.log('inside result chein')
                var d = new Date();
                var e = formatDate(d);

                addProduct("randomName",result.text,'In',e);
                that.checkFile();

                this.triggerSignTx()
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
      );
    },
    triggerSignTx () {
      debugger
      if (lightwallet) {
        let from  = key_Store.addresses[0]
        let message  = "Text to sign"
        ///Signing .......
        let signedMsg = lightwallet.signing.signMsg(key_Store, pwDerivedKey, message, from )
        console.log(signedMsg)
        if(signedMsg){
          ///Verifying.......
          let generatedPublicKeyBytes = lightwallet.signing.recoverAddress(message, signedMsg.v, signedMsg.r, signedMsg.s)
          let generatedPublicKey = this.toHexString(generatedPublicKeyBytes)
          if (generatedPublicKey === from ){
            console.log("Validation Successfull!")
          }
        }
      }
    },
    toHexString(byteArray) {
      return Array.prototype.map.call(byteArray, function(byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
      }).join('');
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
