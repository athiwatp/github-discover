import axios from 'axios'

const action = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser, { root: true })
    }
  },

  login ({ commit }, { username, password }) {
    return axios.post('/api/login', {
      username,
      password
    }).then((res) => {
      commit('SET_USER', res.data, { root: true })
    }).catch((error) => {
      if (error.response.status === 401) {
        throw new Error('Bad credentials')
      }
    })
  },

  logout ({ commit }) {
    return axios.post('/api/logout').then(() => {
      commit('SET_USER', null, { root: true })
    })
  }
}

export default action
