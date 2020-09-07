import Vue from 'vue'
import Vuex from 'vuex'

import tasks from './tasks'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    defaultTaskListId(state) {
      return state.user ? state.user.config.defaultTaskListId : null
    }
  },
  mutations: {
    setDefaultTaskList(state, taskListId) {
      state.user.config.defaultTaskListId = taskListId
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
  },
  modules: {
    tasks,
    auth
  }
})
