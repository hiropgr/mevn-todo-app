import Vue from 'vue'
import Router from 'vue-router'
import authGuard from './authGruard'

import Workspace from '../components/workspace/Container'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Workspace,
      beforeEnter: authGuard
    },
    {
      path: '/registration',
      name: 'reg',
      component: Workspace,
      beforeEnter: authGuard
    },
    {
      path: '/login',
      name: 'login',
      component: Workspace,
      beforeEnter: authGuard
    },
    {
      path: '*',
      redirect: '/'
    },
  ]
})