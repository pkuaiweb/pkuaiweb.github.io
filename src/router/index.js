import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../pages/Home.vue') },
  { path: '/projects', component: () => import('../pages/Projects.vue') },
  { path: '/projects/:id', component: () => import('../pages/ProjectDetail.vue') },
  { path: '/people', component: () => import('../pages/People.vue') },
  { path: '/publications', component: () => import('../pages/Publications.vue') },
  { path: '/awards', component: () => import('../pages/Awards.vue') },
  { path: '/news/:id', component: () => import('../pages/NewsDetail.vue') }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})

