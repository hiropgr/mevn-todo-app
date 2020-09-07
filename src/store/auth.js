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
        commit('setUser', user, { root: true })
        sessionStorage.setItem('user', JSON.stringify({
          email, password
        }));
      } catch (error) {
        console.log(error);
        throw error
      }
    },
    async loginUser({commit}, { email, password }) {
      try {
        const user = await fetchPlus('login', 'post', JSON.stringify({ email, password }))
        commit('setUser', user, { root: true })
        sessionStorage.setItem('user', JSON.stringify({
          email, password
        }));
      } catch (error) {
        console.log(error);
        throw error
      }
    },
    logoutUser({commit}) {
      commit('setUser', null, { root: true })
      sessionStorage.setItem('user', '');
    }
  }
}