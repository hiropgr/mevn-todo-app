import Vue from 'vue'
import Vuex from 'vuex'

function createTask(text) {
  return {
      text,
      createdAt: Date.now(),
      priority: 1,
      completed: false
    }
}

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
    taskLists: [
      {
        _id: 'Hobby',
        name: 'Hobby',
        items: [
          {
            text: 'Finish todo application',
            createdAt: Date.now(),
            priority: 1,
            completed: true
          },
          {
            text: 'Make a sandwich',
            createdAt: Date.now(),
            priority: 1,
            completed: false
          },
          {
            text: 'Watch a movie',
            createdAt: Date.now(),
            priority: 1,
            completed: false
          }
        ]
      },
      {
        _id: 'Study',
        name: 'Study',
        items: [
          {
            text: 'Do math homework',
            createdAt: Date.now(),
            priority: 1,
            completed: false
          }
        ]
      }
    ],
    activeList: null
  },
  getters: {
    allTasks(state) {
      let items = []
      for (const taskList of state.taskLists) {
        for (const task of taskList.items) {
          task.list = taskList;
          items.push(task)
        }
      }
      return { name: 'All tasks', items };
    }
  },
  mutations: {
    setTaskList(state, taskList) {
      state.activeList = taskList
    },
    addTask(state, text) {
      const task = createTask(text)
      if(state.activeList) {
        state.activeList.items.push(task)
      }
      else {
        const list = state.taskLists.find(tl => tl._id == state.user.config.defaultTaskListId)
        list.items.push(task)
      }
    },
    toggleTaskStatus(state, task) {
      task.completed = !task.completed
    },
    updateTaskList(state, {taskList, set}) {
      taskList.name = set.name
    },
    deleteTaskList(state, taskListId) {
      const index = state.taskLists.findIndex(tl => tl._id == taskListId)
      if(index >= 0)
        state.taskLists.splice(index, 1)
    },
    setDefaultTaskList(state, taskListId) {
      state.user.config.defaultTaskListId = taskListId
    }
  },
  actions: {
    addTask({commit}, text) {
      commit('addTask', text)
    },
    toggleTaskStatus({commit}, task) {
      commit('toggleTaskStatus', task)
    },
    updateTaskList({commit}, {taskList, set}) {
      commit('updateTaskList', {taskList, set})
    },
    deleteTaskList({commit}, taskListId) {
      commit('deleteTaskList', taskListId)
    },
    setDefaultTaskList({commit}, taskListId) {
      commit('setDefaultTaskList', taskListId)
    }
  },
  modules: {
  }
})
