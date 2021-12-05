import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

import Admin from '../views/admin/Admin.vue'
import AdminTransactions from '../views/admin/AdminTransactions.vue'
import AdminPaymentMethods from '../views/admin/AdminPaymentMethods.vue'
import AdminUsers from '../views/admin/AdminUsers.vue'
import Page404 from '../views/Page404.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'*',
    name:'page404',
    component: Page404
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/admin/transactions',
    name: 'AdminTransactions',
    component: AdminTransactions
  },
  {
    path: '/admin/payment-methods',
    name: 'AdminPaymentMethods',
    component: AdminPaymentMethods
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: AdminUsers
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
