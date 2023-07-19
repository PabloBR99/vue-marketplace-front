import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", 
      name: 'home',  
      component: HomeView},
    {
      path: '/home',
      redirect: { name: 'home' }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requiresNoAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresNoAuth)) {
    console.log(localStorage.getItem('user'))
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (localStorage.getItem('user') != undefined && localStorage.getItem('user') != 'undefined') {
      next({ name: 'home' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

export default router