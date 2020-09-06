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
    defaultTaskListId(state) {
      return state.user.config.defaultTaskListId
    }
  },
  mutations: {
    setDefaultTaskList(state, taskListId) {
      state.user.config.defaultTaskListId = taskListId
    }
  },
  actions: {
    setDefaultTaskList({commit}, taskListId) {
      commit('setDefaultTaskList', taskListId)
    }
  },
  modules: {
    tasks,
    auth
  }
})
