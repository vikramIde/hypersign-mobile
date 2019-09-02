<template >
  <q-page class="q-pa-lg">
    <div class="container">
        <div class="columns text-center">
          <img class="help-logo" src="http://www.hypermine.in/hypersign/wp-content/uploads/2019/03/cropped-Only_Logo-192x192.png"/>
        </div>
    </div>
    <div class="container">
      <q-list>
        <q-item tag="label" v-ripple>
          <q-item-section >
            <q-item-label class="text-center">Welcome to Hypersign</q-item-label>
            <q-item-label caption>
              {{text2}}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-list link >
        <q-item tag="label" v-ripple>
          <q-item-section avatar top>
            <q-checkbox v-model="color" val="cyan" color="#012F2F" />
          </q-item-section>
          <q-item-section>
            <q-item-label caption>
              {{text3}}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section avatar top>
            <q-checkbox v-model="color" val="cyan" color="#012F2F" />
          </q-item-section>
          <q-item-section>
            <q-item-label caption>
              {{text4}}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <q-item-section avatar top>
            <q-checkbox v-model="color" val="cyan" color="#012F2F" />
          </q-item-section>
          <q-item-section>
            <q-item-label caption>
              {{text5}}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Help',
  data () {
    return {
      color: ['cyan'],
      text2: 'Sign in securly using this app into multiple devices, ',
      text3: 'Crypto Wallet',
      text4: 'Secure Access',
      text5: 'Digital Identity',
      text1: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  }
}
</script>

<style>
.help-logo {
    max-width: 120px;
    padding: 5px;
    box-shadow: burlywood;
}
</style>
