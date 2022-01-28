import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { store } from './store/store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VModal)

new Vue({
  store:store,
  render: h => h(App),
}).$mount('#app')
