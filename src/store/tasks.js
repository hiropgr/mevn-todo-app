import fetchPlus from '../functions/fetchPlus'

export default {
  state: {
    taskLists: null,
    activeList: null,
    activeTask: null
  },
  getters: {
      allTasks(state) {
        let items = []
        if(state.taskLists)
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
    setTaskLists(state, taskLists) {
      state.taskLists = taskLists
    },
    setTaskList(state, taskList) {
      state.activeList = taskList
      state.activeTask = null
    },
    addTask(state, { task, taskListId }) {
      const list = state.taskLists.find(tl => tl._id == taskListId)
      list.items.push(task)
    },
    deleteTask(state, task) {
      if(state.activeTask && task._id == state.activeTask._id) {
        state.activeTask = null
      }

      const taskList = state.taskLists.find(tl => tl._id == task.list._id)
      if(taskList) {
        const index = taskList.items.findIndex(t => t._id == task._id)
        if(index >= 0) {
          taskList.items.splice(index, 1)
        }
      }
    },
    updateTaskText(state, { task, value }) {
      task.text = value
    },
    updateTaskPriority(state, { task, value }) {
      task.priority = value
    },
    toggleTaskStatus(state, task) {
      task.completed = !task.completed
    },
    createTaskList(state, taskList) {
      state.taskLists.push(taskList)
    },
    updateTaskList(state, {taskList, set}) {
      taskList.name = set.name
    },
    deleteTaskList(state, taskListId) {
      const index = state.taskLists.findIndex(tl => tl._id == taskListId)
      if(index >= 0)
        state.taskLists.splice(index, 1)
    },
    setActiveTask(state, task) {
      state.activeTask = task
    }
  },
  actions: {
    async addTaskQuickly({state, rootState, commit}, text) {
      try {
        let payload = { 
          taskText: text, 
          taskPriority:  0,
          token: rootState.user.token,
          taskListId: state.activeList ? state.activeList._id : rootState.user.config.defaultTaskListId
        }
        const task = await fetchPlus('task', 'post', JSON.stringify(payload))
        task.taskListId = payload.taskListId
        commit('addTask', { task,  taskListId: payload.taskListId })
      } catch (error) {
        commit('setAlert', error.message)
        throw error
      }
    },
    async addTask({commit, rootState}, task) {
      try {
        const uploadedTask = await fetchPlus('task', 'post', JSON.stringify({ 
          taskText: task.text, 
          taskPriority: task.priority,
          token: rootState.user.token,
          taskListId: task.taskListId
        }))
        commit('addTask', { task: uploadedTask, taskListId: task.taskListId })
      } catch (error) {
        commit('setAlert', error.message)
        throw error
      }
    },
    async deleteTask({commit, rootState}, task) {
      try {
        commit('deleteTask', task)
        await fetchPlus('task', 'delete', JSON.stringify({ 
          taskId: task._id, 
          taskListId: task.list._id,
          token: rootState.user.token
        }))
      } catch (error) {
        commit('setAlert', error.message)
        throw error
      }
      commit('deleteTask', task)
    },
    async updateTask({rootState}, { taskListId, updateObj }) {
      try {
        fetchPlus('task', 'put', JSON.stringify({ 
          task: updateObj, 
          taskListId,
          token: rootState.user.token
        }))
      } catch (error) {
        commit('setAlert', error.message)
        throw error
      }
    },
    async updateTaskText({commit, dispatch}, { task, value }) {
      commit('updateTaskText', { task, value })
      let updateObj = {...task}
      delete updateObj.list
      updateObj.text = value
      await dispatch('updateTask', { taskListId: task.list._id, updateObj })
    },
    async updateTaskPriority({commit, dispatch}, { task, value }) {
      commit('updateTaskPriority', { task, value })
      let updateObj = {...task}
      delete updateObj.list
      updateObj.priority = value
      await dispatch('updateTask', { taskListId: task.list._id, updateObj })
    },
    async toggleTaskStatus({commit, dispatch}, task) {
      commit('toggleTaskStatus', task)
      let updateObj = {...task}
      delete updateObj.list
      updateObj.completed = task.completed
      await dispatch('updateTask', { taskListId: task.list._id, updateObj })
    },
    async createTaskList({commit, rootState}, taskListName) {
      try {
        const taskList = await fetchPlus('task-list', 'post', JSON.stringify({
          token: rootState.user.token,
          taskListName
        }))
        commit('createTaskList', taskList)
      } catch (error) {
        commit('setAlert', error.message)
        throw error
      }
    },
    async updateTaskList({commit, rootState}, {taskList, set}) {
      try {
        commit('updateTaskList', {taskList, set})
        const updateObj = {...taskList}
        delete updateObj.items
        await fetchPlus('task-list', 'put', JSON.stringify({
          token: rootState.user.token,
          taskList: updateObj
        }))
      } catch (error) {
        commit('setAlert', error.message)
        throw error
      }
    },
    async deleteTaskList({commit, rootState}, taskListId) {
      try {
        commit('deleteTaskList', taskListId)
        await fetchPlus('task-list', 'delete', JSON.stringify({
          token: rootState.user.token,
          taskListId
        }))
      } catch (error) {
        commit('setAlert', error.message)
        throw error
      }
    },
    async setDefaultTaskList({commit, rootState}, taskListId) {
      try {
        await fetchPlus('default-task-list', 'put', JSON.stringify({
          token: rootState.user.token,
          taskListId
        }))
        commit('setDefaultTaskList', taskListId)
      } catch (error) {
        commit('setAlert', error.message)
        throw error
      }
    }
  }
}