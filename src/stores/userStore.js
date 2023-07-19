import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({ user: {}, token: '' }),
  getters: {
    getUser: () => localStorage.getItem('user'),
    getToken: () => localStorage.getItem('token'),
  },
  actions: {
    setUser(user) {
      console.log('User logged', user)
      localStorage.setItem('user', JSON.stringify(user))
    },
    setToken(token) {
      localStorage.setItem('token', JSON.stringify(token))
    },
  }
})