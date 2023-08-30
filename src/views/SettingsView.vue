<script setup>

import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

</script>

<script></script>

<template>
  <div v-if="userStore.getUser != 'undefined'" class="p-4 text-2xl font-bold" style="width: 200px">Welcome, {{ JSON.parse(userStore.getUser).name }}</div>
  <div class="mx-auto pt-5" style="width: 200px">Settings Component</div>
</template>


<style></style>