<template>
  <div>
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
        <div style="clear:both;"></div>
        <div class="row">
          <div class="width-1of1" >
              <form action="#">
                <div style="positive:relative;width:100%;">
                    <div class="floating-label">
                      <input type="text" required class="full-width login_pass" style="color:#fff;" v-model="form.username">
                      <label style="color:#fff;">Name</label>
                    </div>
                    <div class="floating-label">
                      <input type="text" required class="full-width login_pass" style="color:#fff;"  v-model="form.email">
                      <label style="color:#fff;">E-mail</label>
                    </div>
                    <div class="floating-label">
                      <input type="password" required class="full-width login_pass" style="color:#fff;" v-model="form.password">
                      <label style="color:#fff;">Password</label>
                    </div>
                    <div class="full-width" style="margin-top:30px;positive:absolute;bottom:0;">
                      <button class="light large full-width" @click = "generate()">
                        Register
                      </button>
                    </div>
                    <div class="full-width" style="margin-top:10px;positive:absolute;bottom:0; color:#ddd;" >
                      <p>OR <button href="javascript:void(0)" @click="login()" style="color:#fff;text-decoration:underline;">LOGIN</button> </p>
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

  </div>
  
</template>

<script>
import seedStore from '../stores/seed-store.js'
import { Toast,Loading,Dialog } from 'quasar'
import hypersign_wallet from '../utils/hypersign-wallet'
import Router from 'router'
import userStore from '../stores/user-store.js'
import keyStore from '../stores/key-store.js'

function addUserDet(public_key, form_data) {
  //  
   let id = Math.random().toString(36).substr(2, 9)
    userStore.set(id, {public_key,form_data})
//    Toast.create.positive('Successfully registered!')
}

function addKeyStore(key){
  let id = Math.random().toString(36).substr(2, 9)
  keyStore.set(id,{key});
}

function addSeedStore(seed){
  //
  let id = Math.random().toString(36).substr(2, 9)
  seedStore.set(id, {seed});
}

export default {
  mounted(){
    console.log('Componenet Mounted');
  },
  data () {
    return {
        //itemsInStock:store.state,
        form:{username:'',password:'',email:''}
    }
  },
  methods: {
    generate () {
      //loader
      if(this.form.password !=''&& this.form.username !=''&& this.form.email !='')
      {
        Loading.show({delay : 300})
        debugger
        let gen_promise = hypersign_wallet.generate(this.form.password)
        gen_promise.then((res)=>{
        //
        console.log('Promise resolved.');
        // storing seed to local storage
        debugger
        addSeedStore(res)
        // calling new address promise
        let newaddr_promise = hypersign_wallet.newAddresses(this.form.password, 1)

        newaddr_promise.then((res)=> {
          //
          console.log('Promise resolved.');
          let addresses = res
          for (var i=0; i<addresses.length; ++i) {
              addUserDet(addresses[i],this.form)     
              Loading.hide()
              Toast.create.positive('Successfully registered!')
              Router.replace({ path: '/' })
          }
        }, (err)=> {
          console.log('Promise rejected. Err = ' + err);  
        })
        }, (err) => {
        console.log('Promise rejected. Err = ' + err);  
        })
      }
      else
      {
        Toast.create.negative('Data is missing!')
      }
      
    },

    login(){
      Router.replace({ path: '/' })
    },
    register(){
      Router.replace({ path: 'register' })
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
