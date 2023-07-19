<template>
  <nav class="dark:bg-gray-700 shadow-md shadow-gray-300 dark:shadow-gray-800" v-bind:class="[!isDark ? 'bg-gray-50' : '']">
    <div class="flex flex-wrap items-center justify-between mx-auto px-4 py-2">
      <a href="home" class="flex items-center pt-2">
        <img src="../assets/logo.png" class="h-8 mr-3 pb-1" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white -mt-1">Marketplace</span>
      </a>
      <button data-collapse-toggle="navbar-default" type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul class="font-medium align-center p-1 flex">
          <li class="pt-1">
            <a href="home"
              class="block py-2 pl-3 pr-4 text-gray-700 dark:text-gray-200 rounded hover:opacity-50 active:translate-y-0.5">Home</a>
          </li>
          <li class="pt-1">
            <a href="#"
              class="block py-2 pl-3 pr-4 text-gray-700 dark:text-gray-200 rounded hover:opacity-50 active:translate-y-0.5">Contact</a>
          </li>
          <li class="pt-3 ml-auto">
            <!-- PROFILE BUTTON  -->
            <button class="ml-5 rounded-full inline hover:opacity-50 active:translate-y-0.5" @click="drop = !drop">
              <font-awesome-icon v-if="!drop" icon="fa-solid fa-user-circle" class="text-gray-700 dark:text-gray-100 text-xl pb-0.5" />
              <div v-else style="width: 20px; height: 20px;" class="opacity-30">
                <font-awesome-icon icon="fa-solid fa-user-circle" class="text-gray-800 dark:text-gray-100 text-xl pb-0.5" />
              </div>
            </button>
            <!-- LIKES BUTTON -->
            <button class="ml-5 rounded-full inline justify-center items-center active:translate-y-0.5" style="max-width: 20px; max-height: 20px;">
              <font-awesome-icon icon="fa-solid fa-heart" class="text-red-600 text-xl pb-0.5 dark:hover:text-red-600" style="transform: scale(0.9);"/>
              <font-awesome-icon icon="fa-solid fa-heart" class="text-gray-700 dark:text-gray-100 text-xl pb-0.5 hover:opacity-0" style="transform: translate(-0.2px, -26.5px);"/>
            </button>
            <!-- CART BUTTON -->
            <button class="ml-5 rounded-full inline hover:opacity-50 active:translate-y-0.5 justify-center">
              <font-awesome-icon icon="fa-solid fa-cart-shopping" class="text-gray-700 dark:text-gray-100 text-xl pb-0.5 hover:text-red-600" />
            </button>
            <!-- THEME BUTTON -->
            <button @click="changeTheme" class="mx-5 rounded-full inline hover:opacity-70 active:translate-y-0.5"
              style="max-width: 15px; max-height: 26.5px;">
              <div>
                <!-- SUN ICON -->
                <font-awesome-icon id="sun" v-if="!isDark" icon="fa-solid fa-sun" class="text-yellow-300 text-xl pb-0.5 sun" />
                <!-- MOON ICON -->
                <font-awesome-icon id="moon" v-if="isDark" icon="fa-solid fa-moon" class="text-gray-100 text-xl pb-0.5 sun-outline pl-0.5" />
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- DROPDOWN -->
  <Transition>
    <div v-if="this.drop"
      class="ml-auto fixed right-7 md:top-14 bg-gray-200 text-center text-sm shadow-md shadow-gray-light text-gray-600">
      <a v-if="userStore.getUser == 'undefined'" href="login"
        class="px-14 py-2 bg-red text-red hover:bg-gray-300 cursor-pointer border-b border-gray-300 flex">
        <img src="../assets/login.svg" alt="likes_icon" width="12" height="12" class="mr-1 opacity-60">
        Login
      </a>
      <div v-if="userStore.getUser == 'undefined'"
        class="px-14 py-2 bg-red hover:bg-gray-300 cursor-pointer border-b border-gray-300 flex">
        <img src="../assets/sign-up.svg" alt="likes_icon" width="12" height="12" class="mr-1 opacity-60">
        Sign up
      </div>
      <div v-else @click="signOut"
        class="px-14 py-2 bg-red hover:bg-gray-300 cursor-pointer border-b border-gray-300 flex">
        <img src="../assets/sign-out.svg" alt="likes_icon" width="12" height="12" class="mr-1 opacity-60">
        Sign out
      </div>
      <div class="px-14 py-2 bg-red hover:bg-gray-300 cursor-pointer border-b border-gray-300">Language</div>
      <div class="px-14 py-2 bg-red hover:bg-gray-300 cursor-pointer">Theme</div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      drop: false,
    }
  },
  methods: {}

}
</script>

<script setup>

import router from '@/router';
import { useUserStore } from '@/stores/userStore';
import { useDark, useToggle } from '@vueuse/core';

const userStore = useUserStore();
// const themeStore = useThemeStore();
const isDark = useDark();
const toggleDark = useToggle(isDark);

function signOut() {
  userStore.setUser(undefined);
  router.go();
}

function changeTheme() {
  toggleDark()
}

</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.sun-outline {
  animation: fade1 3s linear;
}

.sun {
  animation: fade2 3s linear;
}


@keyframes fade1 {
  0% {
    opacity: 0;
  }

  35% {
    opacity: 0;
  }

  50% {
    opacity: 0.9;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fade2 {
  0% {
    opacity: 0;
  }

  35% {
    opacity: 0;
  }

  50% {
    opacity: 0.9;
  }

  100% {
    opacity: 1;
  }
}</style>
