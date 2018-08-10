import Vue from 'vue'
import { LocalStorage } from 'quasar'

export default {
  state: LocalStorage.get.item('tx-det') || {},
  set (id,item) {
    // Vue.set(this.state,id, item)
    LocalStorage.set('tx-det', item)
  },
  del () {
    Vue.delete(this.state,id)
    LocalStorage.set('tx-det', this.state)
  },
  clear(){
  	this.state ={};
  	LocalStorage.remove('tx-det')
  }

}
