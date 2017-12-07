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

    newStatus (state, payload) {
      console.log('~~~~~NEW STATUS CALLED')
      state.statuses.push(payload)
    },

    removeStatus (state, statusIndex) {
      state.statuses.splice(statusIndex, 1)
    },

    setLikeStatus (state, payload) {
      state.statuses[payload.index].likelist.push(payload.accountId)
    },

    addComment (state, payload) {
      state.statuses[payload.index].commentlist.push(payload.content)
    },

    updateCaption (state, payload) {
      state.statuses[payload.index].caption = payload.caption
    }
  },
  actions: {
    setCaption (context, payload) {
      context.commit('updateCaption', payload)
    },

    setComment (context, payload) {
      http.post('/api/statuses/' + payload.id + '/comment', { comment: payload.content })
        .then(({ data }) => {
          console.log('addComment', data)

          alert('Komen Ditambah')

          context.commit('addComment', payload)

        }).catch(err => console.log({ message: 'Something wrong', error: err.message }))

    },

    createStatus (context, payload) {
      http.post('/api/statuses', payload)
        .then(({ data }) => {
          console.log("createStatus", data)
          alert('Status Ditambah')

          context.commit('newStatus', data.status)

        }).catch(err => console.log({ message: 'Something wrong', error: err.message }))
    },

    getStatuses (context) {
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

    deleteStatus (context, payload) {
      http.delete('/api/statuses/' + payload.id)
        .then(({ data }) => {
          context.commit('removeStatus', payload.index)

        }).catch(err => console.log({ message: 'Something wrong', error: err.message }))
    },

    likeStatus (context, payload) {
      console.log("~~~LIKEAC ", payload)
      http.put('/api/statuses/' + payload.id + '/like/' + payload.accountId)
        .then(({ data }) => {
          context.commit('setLikeStatus', {index: payload.index, accountId: payload.accountId})

        }).catch(err => console.log({ message: 'Something wrong', error: err.message }))
    },
  }
})
