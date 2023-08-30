import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({ user: {}, token: '' }),
  getters: {
    getUser: () => {
      if (localStorage.getItem('user') && localStorage.getItem('user') != 'undefined'){
        return localStorage.getItem('user')
      }else if(sessionStorage.getItem('user') && sessionStorage.getItem('user') != 'undefined'){
        return sessionStorage.getItem('user')
      }else{
        return 'undefined'
      }
    },
    getToken: () => {
      if (localStorage.getItem('token') && localStorage.getItem('token') != 'undefined'){
        return localStorage.getItem('token')
      }else if(sessionStorage.getItem('token') && sessionStorage.getItem('token') != 'undefined'){
        return sessionStorage.getItem('token')
      }else{
        return 'undefined'
      }
    },
  },
  actions: {
    setUser(user, remember=false, logout=false) {
      if(logout){
        localStorage.setItem('user', undefined)
        sessionStorage.setItem('user', undefined)
      }else{
        if (remember){
          localStorage.setItem('user', JSON.stringify(user))
        }else{
          sessionStorage.setItem('user', JSON.stringify(user))
        }
      }
    },
    setToken(token, remember=false, logout=false) {
      if(logout){
        localStorage.setItem('token', undefined)
        sessionStorage.setItem('token', undefined)
      }else{
        if (remember){
          localStorage.setItem('token', JSON.stringify(token))
        }else{
          sessionStorage.setItem('token', JSON.stringify(token))
        }
      }
    }
  }
})