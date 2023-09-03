<script setup>

import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';

const userStore = useUserStore();
var products = ref([])
fetch("https://fakestoreapi.com/products?limit=5").then(res=>res.json())
            .then(json => {
                for(var p in json){
                  products.value.push(json[p])
                }
              });
</script>

<script>
import { defineComponent } from 'vue'
import { Carousel, Slide, Navigation} from 'vue3-carousel'

export default defineComponent({
  name: 'WrapAround',
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data: () => ({
    breakpoints: {
      // 700px and up
      700: {
        itemsToShow: 2.5,
        snapAlign: 'center',
      },
      // 1024 and up
      1080: {
        itemsToShow: 4,
        snapAlign: 'center',
      },
      1440: {
        itemsToShow: 5.5,
        snapAlign: 'center',
      }
    },
  }),
})

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
  <div class="text-gray-900 bg-gray-100 dark:bg-gray-600">
    <nav class="grid md:grid-cols-2 grid-cols-1 bg-gray-50 dark:bg-gray-600 drop-shadow shadow-sm shadow-gray-400">
      <ul class="flex align-center items-center pt-6 pb-5">
        <a href="#" class="mx-4 active:translate-y-0.5 border-b-2 border-transparent hover:border-yellow-400"><p class="hover:text-black">Shoes</p></a>
        <a href="#" class="mx-4 active:translate-y-0.5 border-b-2 border-transparent hover:border-yellow-400"><p class="hover:text-black">Clothes</p></a>
        <a href="#" class="mx-4 active:translate-y-0.5 border-b-2 border-transparent hover:border-yellow-400"><p class="hover:text-black">Accesories</p></a>
        <a href="#" class="mx-4 active:translate-y-0.5 border-b-2 border-transparent hover:border-yellow-400"><p class="hover:text-black">Sport</p></a>
      </ul>
      <!-- SEARCH INPUT -->
      <div class="relative flex items-center align-center pb-1 font-normal text-yellow-900">
        <font-awesome-icon icon="fa-solid fa-search" class="absolute text-gray-600 text-md md:top-[27.5px] top-[15px] md:left-[19.5%] left-[23px]"/>
        <input class="md:ml-auto md:w-[80%] w-[95%] ml-4 mr-3 border-b focus:border-b-2 border-b-gray-400 pt-3 pb-1 pl-[36px] outline-none bg-transparent placeholder:text-gray-700" placeholder="Search:"/>
      </div>
    </nav>
    <!-- CATEGORIES -->
    <div class="">
      <div class="dark:bg-yellow-300 bg-yellow-300 grid lg:grid-cols-3 grid-cols-1 mx-auto px-10 py-10" id="categories">
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
      <div class="mt-6 font-bold text-xl text-center"> - TRENDING - </div>
      <!-- TRENDING PRODUCTS CAROUSEL -->
      <Carousel items-to-show="1" :wrap-around="true" :breakpoints="breakpoints" class="mt-4">
        <slide v-for="p in products" :key="p.id">
          <div class="min-w-[90%] bg-white pb-6 pt-4 mx-2 mb-8 px-12 text-gray-700 rounded-md" style="box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.192);">
            <div class="w-full text-right">
              <!-- LIKES BUTTON -->
              <button class="rounded-full items-center active:translate-y-0.5 -mr-6 mt-1"
                style="max-width: 20px; max-height: 20px;">
                <font-awesome-icon icon="fa-solid fa-heart"
                  class="text-gray-400 hover:text-red-600 dark:text-gray-100 text-lg pb-[9%]"
                  style="transform: scale(1.12); transition: none !important;" />
              </button>
            </div>
            <!-- IMAGE -->
            <img v-bind:src="p.image" alt="" class=" mx-auto object-fill h-[245px] pt-6 max-w-[400px]">
            <!-- PRODUCT DESCRIPTION -->
            <div class="w-full mt-8 text-md text-left max-h-[24px] truncate">{{ p.title.toUpperCase() }}</div>
            <div class="w-full text-sm text-left truncate">{{ p.description[0].toUpperCase() + p.description.slice(1, -1) }}</div>
            <div class="w-full text-sm text-left pt-4 flex items-center">
              <div class="font-bold">{{ p.price.toFixed(2) + ' $' }}</div>
              <div class="ml-auto flex items-center ">
                <div class="pr-2">{{ '(' + p.rating.count + ')' }}</div>
                <!-- RATING -->
                <div v-for="index in parseInt(p.rating.rate)" :key="index"><font-awesome-icon icon="fa-solid fa-star"
                  class="text-yellow-300 flex items-center"/></div>
                <div v-if="p.rating.rate*10 % 10 >= 5" class="flex items-center">
                  <font-awesome-icon icon="fa-solid fa-star-half" class="text-yellow-300" />
                  <font-awesome-icon icon="fa-solid fa-star-half" class="text-gray-400 ml-[-16px]" style="transform: scaleX(-1)"/>
                  <div v-for="index in parseInt(5 - p.rating.rate)" :key="index"><font-awesome-icon icon="fa-solid fa-star"
                  class="text-gray-400 flex items-center"/></div>
                </div>
                <div v-else v-for="index in parseInt(6 - p.rating.rate)" :key="index"><font-awesome-icon icon="fa-solid fa-star"
                  class="text-gray-400 flex items-center"/></div>
                <div class="pl-2 flex items-center -mb-1">{{ p.rating.rate }}</div>
              </div>
            </div>
          </div>
        </slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
      <!-- <div class="flex grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 py-8 mx-auto align-items items-center">
        <div v-for="p in products" :key="p.id">
          <div class="md:w-[90%] md:min-w-[331px] bg-white pb-6 pt-4 mx-4 mb-8 px-10 text-gray-700" style="box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.158);">
            <div class="w-full text-right">
              <button class="rounded-full items-center active:translate-y-0.5 -mr-6 mt-1"
                style="max-width: 20px; max-height: 20px;">
                <font-awesome-icon icon="fa-solid fa-heart"
                  class="text-gray-700 hover:text-red-600 dark:text-gray-100 text-xl pb-[9%]"
                  style="transform: scale(1.12); transition: none !important;" />
              </button>
            </div>
            <img v-bind:src="p.image" alt="" class=" mx-auto object-fill h-[245px] pt-6 max-w-[400px]">
            <div class="w-full mt-8 text-md text-left max-h-[24px] truncate">{{ p.title.toUpperCase() }}</div>
            <div class="w-full text-sm text-left truncate">{{ p.description[0].toUpperCase() + p.description.slice(1, -1) }}</div>
            <div class="w-full text-sm text-left pt-4 flex items-center">
              <div class="font-bold">{{ p.price.toFixed(2) + ' $' }}</div>
              <div class="ml-auto flex items-center ">
                <div class="pr-2">{{ '(' + p.rating.count + ')' }}</div>
                <div v-for="index in parseInt(p.rating.rate)" :key="index"><font-awesome-icon icon="fa-solid fa-star"
                  class="text-yellow-300"/></div>
                <div v-if="p.rating.rate*10 % 10 >= 5" class="flex items-center">
                  <font-awesome-icon icon="fa-solid fa-star-half" class="text-yellow-300" />
                  <font-awesome-icon icon="fa-solid fa-star-half" class="text-gray-400 ml-[-16px]" style="transform: scaleX(-1)"/>
                  <div v-for="index in parseInt(5 - p.rating.rate)" :key="index"><font-awesome-icon icon="fa-solid fa-star"
                  class="text-gray-400"/></div>
                </div>
                <div v-else v-for="index in parseInt(6 - p.rating.rate)" :key="index"><font-awesome-icon icon="fa-solid fa-star"
                  class="text-gray-400"/></div>
                <div class="pl-2">{{ p.rating.rate }}</div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      
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
.carousel__item {
  /* min-height: 200px; */
  /* width: 100%; */
  background-color: var(--vc-clr-primary);
  /* color: var(--vc-clr-white); */
  /* font-size: 20px; */
  /* border-radius: 8px; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  /* padding: 10px; */
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

.carousel__icon{
  height: 32px !important;
  color: black;
  background-color: white;
  border-radius: 100%;
  padding-inline: -9px;
  padding-block: 5px;
}

.carousel__icon:hover{
  background-color: rgb(226, 226, 226);
}



</style>