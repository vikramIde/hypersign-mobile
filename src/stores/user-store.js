import Vue from 'vue'
import { LocalStorage } from 'quasar'

export default {
  state: LocalStorage.get.item('user-det') || {},
  set (id,item) {
    // Vue.set(this.state,id, item)
    LocalStorage.set('user-det', item)
  },
  del () {
    Vue.delete(this.state,id)
    LocalStorage.set('user-det', this.state)
  },
  clear(){
  	this.state ={};
  	LocalStorage.remove('user-det')
  }

}
