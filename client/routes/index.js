import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Signup from '../components/authentication/Signup.vue'
import Signin from '../components/authentication/Signin.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)
Vue.use(Vuetify)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    }
  ]
})

export default router
