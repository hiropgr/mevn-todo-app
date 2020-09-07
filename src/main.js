import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import router from  './router/router'

Vue.config.productionTip = false

Vue.prototype.$priorityColors = {
  0: 'info lighten-2',
  1: 'yellow darken-2',
  2: 'yellow darken-4'
}

let appLink = null
async function start() {
  if(store.state.user === null){

    const stringUser = sessionStorage.getItem('user')
    const user = stringUser ? JSON.parse(stringUser) : null
    if(user)
      await store.dispatch('loginUser', user)
    if(appLink == null) {
      createApp() 
    }
  }
}

function createApp() {
  appLink = new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
  }).$mount('#app')
}

start();

