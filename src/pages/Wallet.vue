<template >
  <q-page class="q-pa-lg">
    <div class="panel-block" v-if="wallet.address">
      <div class="container">
          <div class="columns">
            <div class="column is-one-quarter">
              <img class="crypto-logo" src="https://image.flaticon.com/icons/svg/236/236832.svg"/>
            </div>
            <div class="column wallet-user-name">
              <p>{{ user.name }}</p>
            </div>
          </div>
      </div>
      <div class="container">
        <div class="columns">
          <div class="column is-one-quarter">
            <p>Address</p>
          </div>
          <div class="column is-three-quarter" :key=index v-for="(item, index) in wallet.address">
            <p class="address">{{item}}</p>
          </div>
        </div>
        <!-- <div class="columns">
          <div class="column is-one-quarter">
            <p>Privatekey</p>
          </div>
          <div class="column is-three-quarter" style="max-width:100px">
            <p class="pvt-key">{{ wallet.privateKey }}</p>
          </div>
        </div> -->
      </div>
      </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Wallet',
  computed: {
    ...mapState(['wallet', 'user'])
  }
}
</script>

<style lang="css" scoped>
.address {
  text-overflow: ellipsis;
  max-width: 300px;
  overflow: hidden;
}
.crypto-logo {
  max-height:50px
}
.wallet-user-name {
  text-align: center;
  font-weight: 400;
  font-size: x-large;
}
.coin-toolbar {
  z-index: 9999;
  position: fixed;
}
.pvt-key {
  display:block;
  width:300px;
  word-wrap:break-word;
}
</style>
