import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const localStorage = window.localStorage

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || null,
    notes: null,
    message: '',
    error: null
  },
  mutations: {
    signIn (state, payload) {
      state.token = payload
    },
    signUp (state, payload) {
      state.token = payload
    },
    addNote (state, payload) {
      state.message = payload.message
      state.error = null
    },
    getError (state, payload) {
      state.error = payload.error
      state.message = ''
    },
    getNotes (state, payload) {
      state.notes = payload
    },
    logOut (state, payload) {
      state.token = payload
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
    },
    getNotes: (state) => {
      return state.notes
    },
    getMessage: (state) => {
      return state.message
    },
    getError: (state) => {
      return state.error
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
    getNotes (context) {
      return axios.get('/notes')
        .then((response) => {
          const notes = response.data.notes
          context.commit('getNotes', notes)
        })
    },
    addNote (context, payload) {
      return axios.post('/addnote', payload)
        .then((response) => {
          context.commit('addNote', response.data)
        })
        .catch((error) => {
          context.commit('getError', error.response.data)
        })
    },
    logOut (context) {
      localStorage.removeItem('user-token')
      delete axios.defaults.headers.common['Authorization']
      context.commit('logOut', null)
    }
  }
})

export default store
