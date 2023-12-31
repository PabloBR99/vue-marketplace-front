import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SettingsView from '../views/SettingsView.vue'
import SignUpView from '../views/SignUpView'

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
        requiresNoAuth: true,
        hideNavbar: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
      meta: {
        requiresNoAuth: true,
        hideNavbar: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: {
        requiresAuth: true
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
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('user') == undefined || localStorage.getItem('user') == 'undefined') {
      next({ name: 'home' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

export default router