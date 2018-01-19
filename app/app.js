import Vue from 'vue'
import AppLayout from '../components/Layout.vue'
import router from '../routes'

const app = new Vue({
  router,
  ...AppLayout
})

export { app, router }
