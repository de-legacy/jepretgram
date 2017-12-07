import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const rootUrl = 'http://localhost:3000'

const http = axios.create({
  baseURL: rootUrl
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    statuses: [],
    loggedinUser: {
      id: localStorage.getItem('id'),
      email: localStorage.getItem('email'),
      token: localStorage.getItem('token'),
      username: localStorage.getItem('username')
    }
  },
  mutations: {
    setStatus (state, payload) {
      state.statuses = payload
    },

    setLoggedinUser (state, payload) {
      state.loggedinUser = payload;
    },
  },
  actions: {
    getStatuses (context, payload) {
      console.log('~~~ get Status called');

      http.get('/api/statuses')
        .then(({ data }) => {
         context.commit('setStatus', data)

      }).catch(err => console.log({ message: 'Something wrong', error: err.message }))
    },

    setLogin (context, payload) {
      console.log(payload)

      http.post('/api/signin', { username: payload.username, password: payload.password })
        .then(({ data }) => {
          console.log({ message: 'Success Login', data: data })
          alert('Login Success')

          localStorage.setItem('email', data.email)
          localStorage.setItem('id', data.id)
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)

          let loginData = {
            id: data.id,
            email: data.email,
            token: data.token,
            username: data.username
          }

          context.commit('setLoggedinUser', loginData)


        }).catch(err => {
          alert('Gagal Login. Username')
          console.error({ message: 'Something Wrong on Login', error: err.message })
        })
    },
  }
})
