<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/Nav.vue'
import { useDark } from '@vueuse/core';
const isDark = useDark() 
console.log(isDark.value)
</script>

<template>
  <div id="app" class="overflow-x-hidden min-h-screen max-h-screen overflow-scroll bg-gray-200 dark:bg-gray-600 preload">
    <NavBar/>
    <!-- SUCCESS NOTIFICATION -->
    <notifications group="auth" position="top center" width="100%">
      <template #body="props">
        <div class="my-notification bg-[#6df55b] px-4 py-8 rounded-lg text-gray-600 mx-auto mt-4 w-[95%] md:w-[35%] text-center align-center items-center">
          <div class="mx-auto pr-6"><font-awesome-icon icon="fa-solid fa-check-circle"
            class="text-white text-md hover:text-red-600 absolute -translate-y-11 text-4xl mx-auto" /></div>
          <p class="title font-bold">
            {{ props.item.title }}
          </p>
          <div v-html="props.item.text" class="text-sm"></div>
        </div>
      </template>
    </notifications>
    <!-- ERROR NOTIFICATION -->
    <notifications group="auth_error" position="top center" width="100%">
      <template #body="props">
        <div class="my-notification bg-red-500 px-4 py-8 rounded-lg text-gray-600 mx-auto mt-4 w-[95%] md:w-[35%] text-center align-center items-center">
          <div class="mx-auto pr-6"><font-awesome-icon icon="fa-solid fa-check-circle"
            class="text-white text-md hover:text-red-600 absolute -translate-y-11 text-4xl mx-auto" /></div>
          <p class="title font-bold">
            {{ props.item.title }}
          </p>
          <div v-html="props.item.text" class="text-sm"></div>
        </div>
      </template>
    </notifications>
    <RouterView />
  </div>
</template>

<style></style>
