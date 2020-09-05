import Vue from 'vue'
import Vuex from 'vuex'

import tasks from './tasks'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: 'Askar',
      email: 'hiropgr@gmail.com',
      config: {
        defaultTaskListId: 'Hobby'
      }
    },
  },
  getters: {
    
  },
  mutations: {
    
  },
  actions: {
    
  },
  modules: {
    tasks,
    auth
  }
})
