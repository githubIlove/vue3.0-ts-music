import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { clearPending } from "@/api/axios"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue'),
    meta:{
      playStrip:true,
      tabShow:true
    }
  },
  {
    path: '/attention',
    name: 'Attention',
    component: () => import('../views/Attention.vue'),
    meta:{
      playStrip:true,
      tabShow:true
    }
  },
  {
    path: '/broadcasting',
    name: 'Broadcasting',
    component: () => import('../views/Broadcasting.vue'),
    meta:{
      playStrip:true,
      tabShow:true
    }
  },
  {
    path: '/personal',
    name: 'Personal',
    component: () => import('../views/Personal.vue'),
    meta:{
      playStrip:true,
      tabShow:true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta:{
      playStrip:false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta:{
      playStrip:false
    }
  },

  {
    path: '/songlist/:id',
    name: 'SongList',
    component: () => import('../views/SongList.vue'),
    meta:{
      playStrip:false
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  //在跳转路由之前，先清除所有的请求
  clearPending()
  next()
})

export default router
