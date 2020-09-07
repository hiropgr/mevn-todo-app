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
        const user = await fetchPlus('http://localhost:3000/api/register', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        })
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
        const user = await fetchPlus('http://localhost:3000/api/login', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })
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