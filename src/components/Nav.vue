<template>
  <nav class="dark:bg-gray-700 relative shadow-sm" style="z-index: 1"
    v-bind:class="[!isDark ? 'bg-gray-50' : '', !$route.meta.hideNavbar ? 'shadow-gray-500 dark:shadow-gray-900' : 'shadow-gray-400 dark:shadow-gray-900']">
    <div class="flex flex-wrap items-center justify-between mx-auto px-3 py-5">
      <a href="/home" class="flex items-center pt-2">
        <img src="../assets/logo.png" class="h-8 mr-3 pb-1 w-[40px] h-auto -translate-y-1" alt="Marketplace Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-yellow-300 text-yellow-300 -mt-1">Marketplace</span>
      </a>
      <!-- <button data-collapse-toggle="navbar-default" type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button> -->
      <div class="" id="navbar-default">
        <ul class="font-medium flex align-center items-center px-1 pt-1">
          <!-- <li class="pt-1">
            <a href="home"
              class="block my-2 ml-3 mr-4 text-gray-700 dark:text-gray-200 rounded hover:opacity-50 active:translate-y-0.5">Home</a>
          </li>
          <li class="pt-1">
            <a href="#"
              class="block my-2 ml-3 mr-6 text-gray-700 dark:text-gray-200 rounded hover:opacity-50 active:translate-y-0.5">Contact</a>
          </li> -->
          <li v-if="!$route.meta.hideNavbar" class="px-1" style="max-width: 20px !important;">
            <!-- LIKES BUTTON -->
            <button class="rounded-full items-center active:translate-y-0.5 relative flex items-center"
              style="max-width: 20px; max-height: 20px;">
              <font-awesome-icon icon="fa-solid fa-heart" class="text-red-600 text-xl absolute"
                style="transform: translateY(-1px);" />
              <font-awesome-icon icon="fa-solid fa-heart"
                class="text-gray-700 dark:text-gray-100 text-xl pb-[9%] sm:hover:opacity-0"
                style="transform: scale(1.12);" />
            </button>
          </li>
          <li v-if="!$route.meta.hideNavbar" class="ml-2.5 pl-3 mr-3.5">
            <!-- CART BUTTON -->
            <button class="rounded-full lg:hover:opacity-50 active:translate-y-0.5 flex items-center">
              <font-awesome-icon icon="fa-solid fa-cart-shopping"
                class="text-gray-700 dark:text-gray-100 text-xl pb-0.5"/>
            </button>
          </li>
          <li class="px-1 ml-auto ">
            <!-- PROFILE BUTTON  -->
            <button class="rounded-full lg:hover:opacity-50 active:translate-y-0.5 flex items-center" @click="drop = !drop">
              <div class="flex items-center" style="min-width: 20px;">
                  <!-- OPEN DROPDOWN BUTTON -->
                <font-awesome-icon v-if="!drop" icon="fa-solid fa-user-alt"
                  class="text-gray-700 dark:text-gray-100 text-xl pb-0.5" style="transform: scale(0.94);"/>
                  <!-- CLOSE DROPDOWN BUTTON -->
                <font-awesome-icon v-else icon="fa-solid fa-close"
                  class="text-gray-700 dark:text-gray-100 text-2xl" style="transform: scale(1.1);"/>
              </div>
            </button>
          </li>
          <li class="ml-1 pl-2">
            <!-- THEME BUTTON -->
            <button @click="changeTheme" class="rounded-full lg:hover:opacity-70 active:translate-y-0.5 relative flex items-center">
              <!-- <div> -->
              <!-- SUN ICON -->
              <font-awesome-icon id="sun" v-bind:class="[!isDark ? 'opacity-100' : 'opacity-0']" icon="fa-solid fa-sun" style="transform: scale(1.05);"
                class="text-yellow-300 text-xl pb-0.5 sun absolute" />
              <!-- MOON ICON -->
              <font-awesome-icon id="moon" v-bind:class="[isDark ? 'opacity-100' : 'opacity-0']" icon="fa-solid fa-moon" style="transform: scale(1.05);"
                class="text-gray-50 text-xl sun-outline pl-0.5 pb-0.5" />
              <!-- </div> -->
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- DROPDOWN -->
  <Transition>
    <div v-if="this.drop" style="z-index: 1"
      class="ml-auto absolute right-0.5 lg:right-0.5 top-16 bg-gray-200 dark:bg-gray-800 text-center text-sm shadow-sm shadow-gray-600 dark:shadow-gray-800 text-gray-600 dark:text-gray-300">
        <!-- LOGIN BUTTON -->
      <a v-if="userStore.getToken == 'undefined' || !userStore.getToken" href="/login"
        class="px-9 py-3.5 bg-red text-red hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-300 dark:border-gray-600 flex items-center align-center">
        <div class="mx-auto">
          <font-awesome-icon icon="fa-solid fa-sign-in"
            class="text-gray-700 dark:text-gray-300 text-md pr-1" />
          Login
        </div>
      </a>
      <!-- SIGN UP BUTTON -->
      <a v-if="userStore.getToken == 'undefined' || !userStore.getToken" href="/signup"
        class="px-9 py-3.5 bg-red hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer flex items-center">
        <div class="mx-auto">
          <font-awesome-icon icon="fa-solid fa-user-plus"
            class="text-gray-700 dark:text-gray-300 text-xs pr-1" />
          Sign up
        </div>
      </a>
      <!-- SIGN OUT BUTTON -->
      <a v-if="userStore.getToken && userStore.getToken != 'undefined'" @click="signOut" class="px-9 py-3.5 bg-red hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-300 dark:border-gray-600 flex items-center">
        <div class="mx-auto">
          <font-awesome-icon icon="fa-solid fa-sign-out"
            class="text-gray-700 dark:text-gray-300 text-xs pr-1" />
          Sign out
        </div>
      </a>
      <!-- SETTINGS BUTTON -->
      <a v-if="userStore.getToken && userStore.getToken != 'undefined'" href="settings" class="px-9 py-3.5 bg-red hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer flex items-center">
        <div class="mx-auto">
          <font-awesome-icon icon="fa-solid fa-gear"
            class="text-gray-700 dark:text-gray-300 text-xs pr-1" />
          Settings
        </div>
      </a>
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

// console.log(userStore.getToken)

function signOut() {
  userStore.setUser(undefined, false, true);
  userStore.setToken(undefined, false, true);
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

#sun,
#moon {
  transition: opacity 1s ease-out;
}

#open-dd,
#close-dd {
  transition: opacity 0.8s ease-out;
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
