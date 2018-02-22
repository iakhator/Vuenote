import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './routes'
import store from './store'

import 'vuetify/dist/vuetify.min.css'
import './assets/css/style.css'

sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
