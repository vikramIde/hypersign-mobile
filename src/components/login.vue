<template>
<q-layout>
  <div class="error-page window-height window-width column items-center custom_login">  
    <div class="items-center justify-center" style="height:100%;width:100%;padding:50px; background-image:url('statics/log_bg.png');background-color: #027be3 !important;background-size:cover;" >
      <div class="content_main" style="position:absolute; top:20%;left:40px;right:40px;">
        <div class="row">
          <div class="width-1of1" style="text-align:center;margin-bottom: 20px;">
            <img src="../assets/hyper-logo-white.png" alt="" style="width:40%;">
            <div style="clear:both;"></div>
          </div>
        </div>
        <div class="row">
          <div class="width-1of1" >
              
              <form action="#">
                <div style="positive:relative;width:100%;">
                    <div class="floating-label">
                      <input type="password"  required class="full-width login_pass" style="color:#fff;" v-model = "form.password">
                      <label style="color:#fff;">Enter your password here</label>
                    </div>
                    <div class="full-width" style="margin-top:30px;positive:absolute;bottom:0;">
                      <button class="light large full-width" @click = "login()">
                        LOGIN
                      </button>
                    </div>
                    <div class="full-width" style="margin-top:10px;positive:absolute;bottom:0; color:#ddd;" >
                      <p>OR <a href="javascript:void(0)" @click="register()" style="color:#fff;text-decoration:underline;">REGISTER</a> </p>
                    </div>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
    <div>
    </div>
  </div>
  </q-layout>
</template>
<style>
    input:not(.no-style):focus, textarea:not(.no-style):focus, .textfield:not(.no-style):focus, input:not(.no-style):hover, textarea:not(.no-style):hover, .textfield:not(.no-style):hover, input:not(.no-style) .active, textarea:not(.no-style) .active, .textfield:not(.no-style) .active{
      border-color: #fff!important;
    }
  </style>
<script>
// import store from './product-store'
// import { Toast,Loading,Dialog } from 'quasar'
import Router from 'router'
import hypersign_wallet from '../utils/hypersign-wallet'
import userStore from '../stores/user-store'
import seedStore from '../stores/seed-store'
import { Toast,Loading,Dialog } from 'quasar'


function addUserDet(public_key, form_data) {
   let id = Math.random().toString(36).substr(2, 9)
    userStore.set(id, {public_key,form_data})
//    Toast.create.positive('Successfully registered!')
}
export default {
  mounted(){  
    console.log(this.seedStore.seed)
  },
  data () {
    return {
      seedStore : seedStore.state,
      
      form: {password : ''}
    }
  },
  methods:{
    login(){      
      if(this.form && this.form.password) {
        if(this.seedStore && this.seedStore.seed){
          Loading.show({delay : 300})
          let seed_promise = hypersign_wallet.setSeed(this.form.password, this.seedStore.seed)
          seed_promise.then((res)=> {
            console.log('Promise resolved.');
            let newaddr_promise = hypersign_wallet.newAddresses(this.form.password, 1)
            newaddr_promise.then((res)=> {
              console.log('Promise resolved.');
              let addresses = res
              for (var i=0; i<addresses.length; ++i) {
                  addUserDet(addresses[i],this.form)     
                  Loading.hide()
                  Router.replace({ path: 'wallet' })
              }
            }, (err)=>{
              console.log('Promise rejected. Err = ' + err);
              Toast.create.negative('Error =' + err)  
            })
          }, (err)=>{
            console.log('Promise rejected. Err = ' + err)
            Toast.create.negative('Error =' + err)  
          })     
        }else{
          let msg = "Seed is blank!"
          console.log(msg);  
          Toast.create.negative('Error =' + msg)  
        } 
      }else{
        let msg = "Password is blank!"
        console.log(msg);  
        Toast.create.negative('Error =' + msg)  
      }
    },
    register(){
      Router.replace({ path: 'register' })
    },
    
  }
  
}
</script>

<style lang="stylus">
.logo
  width 40%
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