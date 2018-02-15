import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const localStorage = window.localStorage

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || null
  },
  mutations: {
    signIn (state, payload) {
      state.token = payload
    },
    signUp (state, payload) {
      state.token = payload
    },
    logOut (state) {
      state.token = null
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    userDetails: (state) => {
      if (state.token) {
        const decoded = jwtDecode(state.token)
        return {
          name: decoded.name,
          email: decoded.email,
          id: decoded.id
        }
      }
      return null
    }
  },
  actions: {
    signIn (context, payload) {
      return axios.post('/signin', { email: payload.email, password: payload.password })
        .then((response) => {
          localStorage.setItem('user-token', response.data.token)
          axios.defaults.headers.common['Authorization'] = response.data.token
          context.commit('signIn', response.data.token)
        })
    },
    signUp (context, payload) {
      return axios.post('/signup', payload)
        .then((response) => {
          localStorage.setItem('user-token', response.data.token)
          axios.defaults.headers.common['Authorization'] = response.data.token
          context.commit('signUp', response.data.token)
        })
    },
    logOut (context) {
      localStorage.removeItem('user-token')
      delete axios.defaults.headers.common['Authorization']
      context.commit('logOut')
    }
  }
})

export default store
