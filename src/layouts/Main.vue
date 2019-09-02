<template lang='pug'>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar class="text-center">
        <q-toolbar-title>
          <span>Hypersign</span>
        </q-toolbar-title>
        <q-btn dense flat round icon="mdi-dots-vertical" @click="right = !right" />
      </q-toolbar>
    </q-header>
    <q-drawer show-if-above v-model="right" side="right" bordered>
      <q-btn-dropdown auto-close="" stretch="" flat="" icon="person">
        <q-list>
          <q-item to="/auth/register">
              <q-item-section>Logoff</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-drawer>
    <q-footer height-hint="98" class="footer-height">
      <q-tabs class="bg-primary text-white" align="justify" >
        <q-route-tab v-model="tab" name="wallet" icon="account_balance_wallet" to="/" ></q-route-tab>
        <q-route-tab v-model="tab" name="scan" icon="security" to="/signtx" ></q-route-tab>
        <q-route-tab v-model="tab" name="info" icon="info" to="/help" ></q-route-tab>
      </q-tabs>
    </q-footer>
    <q-page-container>
        <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import copyRight from 'components/CopyRight.vue'

export default {
  name: 'Main',
  components: { copyRight },
  data () {
    return {
      tab: 'wallet',
      leftDrawerOpen: this.$q.platform.is.desktop,
      right: false
    }
  },
  methods: {
    openURL
  }
}
</script>

<style lang='stylus'>
// $
+b('in-tab')
  .q-tab__icon
    transform rotate(180deg)
.footer-height
  max-height 50px

</style>
