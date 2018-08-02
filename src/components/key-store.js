import Vue from 'vue'
import { LocalStorage } from 'quasar'

export default {
  state: LocalStorage.get.item('key-store') || {},
  set (id, item) {
    Vue.set(this.state, id, item)
    LocalStorage.set('key-store', this.state)
  },
  del (id) {
    Vue.delete(this.state, id)
    LocalStorage.set('key-store', this.state)
  },
  clear(){
  	this.state ={};
  	LocalStorage.remove('key-store')
  }

}
