<template lang='pug'>
  q-layout(view="hHh Lpr fFf")
    q-footer
      q-toolbar
        q-toolbar-title.text-subtitle2
          copy-right
    q-page-container
      router-view
</template>

<script>
import copyRight from 'components/CopyRight.vue'
export default {
  name: 'LayoutName',
  components: {
    copyRight
  },
  data () {
    return {
      leftDrawer: true
    }
  }
}
</script>
