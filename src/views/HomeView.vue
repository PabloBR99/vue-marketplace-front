<script setup>

import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

</script>

<script>
// export default {
//   data() {
//     return {
//       // user: JSON.parse(localStorage.getItem('user')).name,
//     }
//   },
//   methods: {}

// }
</script>

<template>
  <div class="text-yellow-900 bg-gray-50 dark:bg-gray-600">
    <nav class="grid md:grid-cols-2 grid-cols-1 bg-yellow-400 drop-shadow shadow-sm shadow-yellow-800">
      <ul class="flex align-center items-center pt-6 pb-5">
        <a href="#" class="mx-4 active:translate-y-0.5 border-b-2 border-transparent hover:border-yellow-600"><p class="hover:text-black">Zapatos</p></a>
        <a href="#" class="mx-4 active:translate-y-0.5 border-b-2 border-transparent hover:border-yellow-600"><p class="hover:text-black">Ropa</p></a>
        <a href="#" class="mx-4 active:translate-y-0.5 border-b-2 border-transparent hover:border-yellow-600"><p class="hover:text-black">Accesorios</p></a>
        <a href="#" class="mx-4 active:translate-y-0.5 border-b-2 border-transparent hover:border-yellow-600"><p class="hover:text-black">Deporte</p></a>
      </ul>
      <!-- SEARCH INPUT -->
      <div class="relative flex items-center align-center pb-1 font-normal text-yellow-900">
        <font-awesome-icon icon="fa-solid fa-search" class="absolute text-yellow-900 text-md md:top-[27.5px] md:left-[19.5%] left-[20px]"/>
        <input class="md:ml-auto md:w-[80%] w-[95%] ml-4 mr-3 border-b focus:border-b-2 border-b-yellow-700 pt-3 pb-1 pl-[5.5%] outline-none bg-transparent placeholder:text-yellow-900" placeholder="Search:"/>
      </div>
    </nav>

    <div class="dark:bg-yellow-300 bg-yellow-300" id="categories">
      <div class="grid lg:grid-cols-3 grid-cols-1 mx-auto px-10 py-10 ">
        <div class="m-3 relative cursor-pointer" id="image">
          <img src="../assets/man-model.jpg" alt="" class="cursor-pointer blur-none hover:blur-sm">
          <div class="absolute w-full h-full bottom-0 text-opacity-30 hover:text-opacity-100 cursor-pointer items-center text-center align-center pt-[60%] text-3xl font-bold text-gray-900">
            MEN
          </div>
        </div>
        <div class="m-3 relative cursor-pointer" id="image">
          <img src="../assets/woman-model.jpg" alt="" class="cursor-pointer hover:opacity-20">
          <div class="absolute w-full h-full bottom-0 text-opacity-30 hover:text-opacity-100 cursor-pointer items-center text-center align-center pt-[60%] text-3xl font-bold text-white">
            WOMEN
          </div>
        </div>
        <div class="m-3 relative cursor-pointer" id="image">
          <img src="../assets/kid-model.jpg" alt="" class="cursor-pointer hover:opacity-20">
          <div class="absolute w-full h-full bottom-0 text-opacity-30 hover:text-opacity-100 cursor-pointer items-center text-center align-center pt-[60%] text-3xl font-bold text-[#db3564]">
            KIDS
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="userStore.getUser != 'undefined'" class="p-4 text-2xl font-bold dark:text-gray-200 text-gray-800" style="width: 200px">Welcome, {{ JSON.parse(userStore.getUser).name }}</div>
</template>


<style>
#categories #image{
  transition: all .5s ease-in-out;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.347);
}
#categories #image:hover{
  transform: scale(1.04);
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.576);
  /* z-index: -1; */
}
</style>