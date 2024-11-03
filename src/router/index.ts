import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('../pages/Index/Index.vue')
    },
    {
      path: '/team',
      name: 'Team',
      component: () => import('../pages/Team/Team.vue')
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('../pages/User/User.vue')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('../pages/Search/Search.vue')
    },
    {
      path: '/edit',
      name: 'Edit',
      component: () => import('../pages/User/Edit.vue')
    },
    {
      path: '/searchresult',
      name: 'SearchResult',
      component: () => import('../pages/Search/SearchResult.vue')

    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/Login/index.vue')

    }
  ]
})

export default router