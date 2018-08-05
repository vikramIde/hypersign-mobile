import Vue from 'vue'
import { LocalStorage } from 'quasar'

export default {
  state: LocalStorage.get.item('seed-store') || {},
  set (id,item) {
    Vue.set(this.state, id, item)
    LocalStorage.set('seed-store', item)
  },
  del () {
    Vue.delete(this.state, id)
    LocalStorage.set('seed-store', this.state)
  },
  clear(){
  	this.state ={};
  	LocalStorage.remove('seed-store')
  }

}
