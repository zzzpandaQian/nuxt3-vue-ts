// createWebHistory: history模式; createWebHashHistory: hash模式; createMemoryHistory ssr模式
import {createRouter, createWebHistory, createMemoryHistory, createWebHashHistory} from 'vue-router'
import home from '../views/home/index.vue'
import mine from '../views/mine/index.vue'

const routes = [
    {
        path: '/home',
        component: home,
        name: 'home'
    },
    {
        path: '/mine',
        component: mine,
        name: 'mine'
    },
    {
      path: '/dbtest',
      component: ()=>import('../views/dbtest/index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
