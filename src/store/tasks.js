function createTask(text, priority) {
  return {
      _id: text,
      text,
      createdAt: Date.now(),
      priority,
      completed: false
    }
}

function createTaskList(name) {
  return {
    _id: name,
    name,
    items: []
  }
}

export default {
  state: {
    taskLists: [
      {
        _id: 'Hobby',
        name: 'Hobby',
        items: [
          {
            _id: 'Finish todo application',
            text: 'Finish todo application',
            createdAt: Date.now(),
            priority: 1,
            completed: true
          },
          {
            _id: 'Make a sandwich',
            text: 'Make a sandwich',
            createdAt: Date.now(),
            priority: 0,
            completed: false
          },
        ]
      },
      {
        _id: 'Study',
        name: 'Study',
        items: [
          {
            _id: 'Do math homework',
            text: 'Do math homework',
            createdAt: Date.now(),
            priority: 2,
            completed: false
          }
        ]
      }
    ],
    activeList: null,
    activeTask: null
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
      state.activeTask = null
    },
    addTask(state, { text, priority, taskListId }) {
      const task = createTask(text, priority)
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
    createTaskList(state, taskListName) {
      state.taskLists.push(createTaskList(taskListName))
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
    addTaskQuickly({state, rootState, commit}, text) {
      let payload = { 
        text, 
        priority: 0, 
        taskListId: this.state.activeList ? state.activeList._id : rootState.user.config.defaultTaskListId
      }
      commit('addTask', payload)
    },
    addTask({commit}, task) {
      commit('addTask', task)
    },
    deleteTask({commit}, task) {
      commit('deleteTask', task)
    },
    updateTaskText({commit}, { task, value }) {
      commit('updateTaskText', { task, value })
    },
    updateTaskPriority({commit}, { task, value }) {
      commit('updateTaskPriority', { task, value })
    },
    toggleTaskStatus({commit}, task) {
      commit('toggleTaskStatus', task)
    },
    createTaskList({commit}, taskListName) {
      commit('createTaskList', taskListName)
    },
    updateTaskList({commit}, {taskList, set}) {
      commit('updateTaskList', {taskList, set})
    },
    deleteTaskList({commit}, taskListId) {
      commit('deleteTaskList', taskListId)
    },
  }
}