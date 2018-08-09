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
    <q-tab icon="alarm" route="/wallet" exact replace>Wallet</q-tab>
    <q-tab icon="alarm" route="/signtx" exact replace>Scan QR</q-tab>
  </q-tabs>
  <div class="layout-padding">
      
      <blockquote >
          <b>Account : </b> 
          <small>
            {{  this.userDetails.public_key }}
          </small>

          <b>User Name : </b> 
          <small>
            {{ this.userDetails.form_data && this.userDetails.form_data.username }}
          </small>

      </blockquote>
      
  </div>


  <!-- Footer -->
  <div slot="footer" class="toolbar">
    All right reserved Hypermine technologies
  </div>
  </q-layout>
</template>

<script>
import store from './product-store'
import userStore from '../stores/user-store.js'
import { Toast,Loading,Dialog } from 'quasar'
import Router from 'router'
    
function addUserDet(public_key, user_name) {
  let id = Math.random().toString(36).substr(2, 9)

  userStore.set(id, {public_key,user_name})
  Toast.create.positive('Successfully registered!')
}
  

export default {
  mounted(){
    console.log('Componenet Mounted')
    console.log(this.userDetails)
    
  },
  data () {
    return {
        
        itemsInStock:store.state,
        userDetails : userStore.state,
        form:{username:'',password:'',email:''}
    }
  },
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
