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

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
