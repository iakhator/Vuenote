import Vue from 'vue'
import axios from 'axios'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './routes'
import store from './store'
import dateFilter from './filters/dates'

import 'vuetify/dist/vuetify.min.css'
import './assets/css/style.css'
import capitalize from './filters/capitalize'

const token = window.localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

sync(store, router)
Vue.config.productionTip = false
Vue.filter('date', dateFilter)
Vue.filter('capitalize', capitalize)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
