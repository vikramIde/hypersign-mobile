<template lang='pug'>
  q-layout(view="hHh Lpr fFf")
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
