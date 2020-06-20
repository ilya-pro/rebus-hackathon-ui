import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Proposals from '../views/Proposals'
import ProposalPage from '../views/ProposalPage'
import Login from '../views/Login'

Vue.use(VueRouter)

  const routes = [
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
    path: '/proposals',
    name: 'proposals',
    component: Proposals
  },
  {
    path: '/proposals/:id',
    name: 'ProposalPage',
    component: ProposalPage
  },
  {
    path: '/account',
    name: 'Account',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Account.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
