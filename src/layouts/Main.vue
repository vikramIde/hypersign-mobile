<template lang='pug'>
  q-layout(view="lHh Lpr lFf")
    q-tabs(align="justify").bg-primary.text-white
      q-route-tab.in-tab(v-model='tab' name='stockin' icon='arrow_right_alt' to='/stockin' label='In')
      q-route-tab(v-model='tab' name='stockout' icon='arrow_right_alt' to='/stockout' label='Out')
      q-route-tab(v-model='tab' name='scan' icon='code' to='/signtx' label='QR scan')
      q-route-tab(v-model='tab' name='sync' icon='sync' to='/sync' label='Sync')
      q-route-tab(v-model='tab' name='help' icon='help_outline' to='/help' label='Help')
      q-btn-dropdown(auto-close='' stretch='' flat='' icon='person' )
        q-list
          q-item(to='/auth/register')
            q-item-section Logoff
    q-footer
      q-toolbar-title
        copy-right
    q-page-container
      router-view
</template>

<script>
import { openURL } from 'quasar'
import copyRight from 'components/CopyRight.vue'

export default {
  name: 'Main',
  components: { copyRight },
  data () {
    return {
      tab: 'stockin',
      leftDrawerOpen: this.$q.platform.is.desktop
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
</style>
