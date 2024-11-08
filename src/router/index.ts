import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('../pages/Index/Index.vue')
    },
    {
      path: '/team',
      name: 'Team',
      component: () => import('../pages/Team/Team.vue'),
      // children: [
      //   {
      //     path: 'add',
      //     name: 'TeamAdd',
      //     component: () => import('../pages/Team/Add.vue')
      //   },
      // ]
    },
    {
      path: '/team/add',
      name: 'TeamAdd',
      component: () => import('../pages/Team/Add.vue')
    },
    {
      path: '/team/update',
      name: 'TeamUpdate',
      component: () => import('../pages/Team/Update.vue')
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('../pages/User/User.vue')
    },
    {
      path: '/user/update',
      name: 'UserUpdate',
      component: () => import('../pages/User/UserUpdate.vue')
    },
    {
      path: '/user/team/create',
      name: 'UserTeamCreate',
      component: () => import('../pages/User/UserTeamCreate.vue')
    },
    {
      path: '/user/team/join',
      name: 'UserTeamJoin',
      component: () => import('../pages/User/UserTeamJoin.vue')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('../pages/Search/Search.vue')
    },
    {
      path: '/edit',
      name: 'Edit',
      component: () => import('../pages/User/UserEdit.vue')
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