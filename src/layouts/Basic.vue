<template lang='pug'
  q-layout(view="hHh Lpr fFf") <!-- Be sure to play with the Layout demo on docs -->
    q-header(elevated)
      q-toolbar(
        q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        )
        q-toolbar-title
          Header
        q-toolbar-title
      q-toolbar

      q-tabs
        q-route-tab(
          icon="map"
          to="/your/route"
          replace
          label="One Tab"
        )
        q-route-tab(
          icon="assignment"
          to="/some/other/route"
          replace
          label="Other Tab"
        )
      q-tabs
    q-header

    <!-- (Optional) The Footer -->
    q-footer
        Footer
    q-footer
    q-page-container
      <!-- This is where pages get injected -->
      router-view
    q-page-container

  q-layout
</template>

<script
export default {
  // name: 'LayoutName',

  data () {
    return {
      leftDrawer: true
    }
  }
}
</script
