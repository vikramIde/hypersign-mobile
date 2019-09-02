<template >
  <q-page class="q-pa-lg">
    <q-list bordered padding class="rounded-borders" style="max-width: 350px">
      <q-item-label header>Your Keys</q-item-label>
      <q-item clickable v-ripple>
        <q-item-section avatar top>
          <q-avatar icon="lock" color="grey" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Nano SSO</q-item-label>
          <q-item-label caption>February 22nd, 2019</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="info" color="orange" />
        </q-item-section>
      </q-item>
      <q-separator spaced ></q-separator>
      <q-item clickable v-ripple>
        <q-item-section avatar top>
          <q-avatar icon="lock" color="grey" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Hypermine SSO</q-item-label>
          <q-item-label caption>September 21st, 2019</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="info" color="green" />
        </q-item-section>
      </q-item>
    </q-list>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab color="purple" icon="keyboard_arrow_up" direction="up">
        <q-fab-action color="primary" @click="onClick" icon="phonelink_ring" />
        <q-fab-action color="secondary" @click="onClick" icon="payment" />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Signtx',
  computed: {
    ...mapState(['wallet', 'user'])
  },
  data () {
    return {
      scanText: 'Quick Brown Fox Jump Over a Lazy Dog'
    }
  },
  methods: {
    ...mapActions('wallet', [
      'signMessageTx'
    ]),
    onClick () {
      this.signMessageTx(this.scanText)
        .then(res => {
          console.log(res)
          let data = {
            'data': {
              'attributes': {
                'companyId': 21,
                'signedRsv': res,
                'publicToken': this.wallet.address[0],
                'rawMsg': this.scanText
              }
            }
          }
          console.log(JSON.stringify(data))
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style>
</style>
