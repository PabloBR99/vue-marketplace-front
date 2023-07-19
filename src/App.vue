<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/Nav.vue'
import { useDark } from '@vueuse/core';

const isDark = useDark() 
console.log(isDark)
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-200 dark:bg-gray-600 preload">
    <NavBar />
    <RouterView />
  </div>
</template>

<style>
/* #app.preload *{
  animation-duration: 0s !important;
  -webkit-animation-duration: 0s !important;
  transition:background-color 0s, opacity 0s, color 0s, width 0s, height 0s, padding 0s, margin 0s !important;
  } */
</style>
