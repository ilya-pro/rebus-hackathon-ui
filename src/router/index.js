import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home'
import Proposals from '../views/Proposals'
import ProposalPage from '../views/ProposalPage'
import Login from '../views/Login'
import Projects from "../views/Projects";
import Shop from "../views/Shop";

Vue.use(VueRouter)

  const routes = [
  /*{
    path: '/',
    name: 'Home',
    component: Home
  },*/
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    alias: ['/proposals'],
    name: 'proposals',
    component: Proposals
  },
  {
    path: '/proposals/:id',
    alias: ['/proposals/new'],
    name: 'ProposalPage',
    component: ProposalPage
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
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
