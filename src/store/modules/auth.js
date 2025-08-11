import authService from '@/api/services/authService'

const state = {
  currentUser: null,
  loading: false,
  error: null
}

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_CURRENT_USER(state, user) {
    state.currentUser = user
  },
  LOGOUT(state) {
    state.currentUser = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}

const actions = {
  async login({ commit }, credentials) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const data = await authService.login(credentials)

      // Extract token & user
      const token = data.token
      const user = data.user

      // Store in localStorage so it persists
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      commit('SET_CURRENT_USER', user)
      commit('SET_LOADING', false)

      return data
    } catch (error) {
      commit('SET_ERROR', error.message || 'Login failed')
      commit('SET_LOADING', false)
      throw error
    }
  },

  async register({ commit }, userData) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const data = await authService.register(userData)
      commit('SET_LOADING', false)
      return data
    } catch (error) {
      commit('SET_ERROR', error.message || 'Registration failed')
      commit('SET_LOADING', false)
      throw error
    }
  },

  logout({ commit }) {
    commit('LOGOUT')
  },

  async checkAuth() {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    return !!token && !!user
  }
}

const getters = {
  isAuthenticated: () => !!localStorage.getItem('token'),
  currentUser: () => JSON.parse(localStorage.getItem('user') || 'null'),
  loading: (state) => state.loading,
  error: (state) => state.error,
  token: () => localStorage.getItem('token')
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}




