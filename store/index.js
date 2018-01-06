import axios from 'axios'

export const state = () => ({
  authUser: null,
  sidebar: false
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  SET_USER (state, user) {
    state.authUser = user
  }
}

export const action = {
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
