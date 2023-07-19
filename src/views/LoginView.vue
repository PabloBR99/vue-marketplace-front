<script setup>
import router from '@/router';
import { useUserStore } from '../stores/userStore'



</script>

<script>
export default {
  data: () => {
    return {
      email: '',
      password: '',
      remember: false,
      userStore: useUserStore()
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      });

      response.json().then((res) => {
        const user_info = { id: res.user.id, name: res.user.name }
        console.log(res)
        if (user_info) {
          this.userStore.setUser(user_info)
          if (history.length > 2) {
            router.back()
          } else {
            router.push({ path: '/home' })
          }
        }
      }).catch(console.error);
    }
  },
};
</script>

<template>
  <div class="w-4/5 md:w-1/2 bg-gray-50 mx-auto px-10 py-11 my-12 shadow-md shadow-gray-300 rounded-lg">
    <!-- TITLE -->
    <p class="text-2xl font-bold mb-6">Sign in to your account</p>
    <!-- EMAIL -->
    <p class="text-sm mb-2" style="font-weight: 500;">Your email</p>
    <input class="outline-blue-600 border border-gray-300 py-2 px-2.5 rounded-md w-full text-sm bg-gray-100"
      v-model="email" placeholder="name@company.com" />
    <!-- PASSWORD -->
    <p class="mt-6 text-sm mb-2" style="font-weight: 500;">Password</p>
    <input type="password"
      class="outline-blue-600 border border-gray-300 py-2 px-2.5 rounded-md w-full placeholder:tracking-wider text-sm bg-gray-100 placeholder:text-password"
      v-model="password" placeholder="•••••••••" />
    <!-- REMEMBER ME + FORGOT PASSWORD -->
    <div class="flex mt-6 px-0.5">
      <div class="flex items-center select-none">
        <input v-model="remember" id="remember" type="checkbox"
          class="cursor-pointer rounded w-3.5 h-3.5 focus:ring-transparent border border-gray-400">
        <label for="remember" class="text-sm ml-2 text-gray-500 cursor-pointer hover:text-gray-400">Rembember me</label>
      </div>
      <div class="ml-auto">
        <a href="#" class="text-sm text-blue-600 hover:text-blue-400">Forgot password?</a>
      </div>
    </div>
    <!-- SIGN IN BUTTON -->
    <button @click="login"
      class="bg-blue-600 hover:bg-blue-500 text-gray-100 w-full mt-6 p-1.5 rounded-lg shadow-md active:translate-y-0.5">Sign
      in</button>
    <!-- DONT HAVE ACCOUNT -->
    <p class="mt-6 text-sm text-gray-400">Don't have an account yet? <a href="#"
        class="text-sm text-blue-600 hover:text-blue-400">Sign up</a></p>
  </div>
</template>


<style></style>