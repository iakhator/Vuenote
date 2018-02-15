import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import store from '../store'
import Signup from '../components/authentication/Signup.vue'
import Signin from '../components/authentication/Signin.vue'
import Dashboard from '../components/Dashboard.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)
Vue.use(Vuetify)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/dashboard')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/signin')
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: ifAuthenticated
    }
  ]
})

export default router
