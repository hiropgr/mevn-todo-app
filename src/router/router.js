import Vue from 'vue'
import Router from 'vue-router'
import authGuard from './authGruard'

import Workspace from '../components/workspace/Container'
import Reg from '../components/auth/Reg'
import Login from '../components/auth/Login'

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
      path: '/signup',
      name: 'reg',
      component: Reg,
    },
    {
      path: '/signin',
      name: 'login',
      component: Login,
    },
    {
      path: '*',
      redirect: '/'
    },
  ]
})