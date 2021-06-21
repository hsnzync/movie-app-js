import Vue from 'vue'
import VueRouter from 'vue-router'
import { MovieOverview, MovieDetail } from '../components'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'overview',
    component: MovieOverview,
    props: true
  },
  {
    path: '/:movieId',
    name: 'detail',
    component: MovieDetail,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
