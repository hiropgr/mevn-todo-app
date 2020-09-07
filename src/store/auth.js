import fetchPlus from '../functions/fetchPlus'

export default {
  state: {
    
  },
  getters: {
      
  },
  mutations: {
    
  },
  actions: {
    async registerUser({commit}, { email, password, name }) {
      try {
        const user = await fetchPlus('register', 'post', JSON.stringify({ email, password, name }))
        commit('setTaskLists', user.taskLists)
        commit('setUser', user, { root: true })
        sessionStorage.setItem('user', JSON.stringify({
          email, password
        }));
      } catch (error) {
        commit('setAlert', error.message)
        throw error
      }
    },
    async loginUser({commit}, { email, password }) {
      try {
        const user = await fetchPlus('login', 'post', JSON.stringify({ email, password }))
        sessionStorage.setItem('user', JSON.stringify({
          email, password
        }));
        commit('setTaskLists', user.taskLists)
        commit('setUser', user, { root: true })
      } catch (error) {
        commit('setAlert', error.message)
        throw error
      }
    },
    logoutUser({commit}) {
      commit('setUser', null, { root: true })
      sessionStorage.setItem('user', '');
      document.location.reload(true)
    }
  }
}