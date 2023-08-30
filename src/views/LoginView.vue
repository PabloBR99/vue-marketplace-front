<script setup>
import router from '@/router';
import { useUserStore } from '../stores/userStore';
import { useVuelidate } from '@vuelidate/core'
import { required, email as email_validator} from '@vuelidate/validators'
</script>

<script>
export default {
  mounted: () => {
    document.getElementById('login').scrollIntoView()
  },
  data() {
    return {
      email: '',
      password: '',
      remember: false,
      userStore: useUserStore(),
      showPassword: false,
      v$: useVuelidate(),
      errorMessage: null
    };
  },
  validations() {
    return {
      email: { required, email_validator },
      password: { required }
    }
  },
  methods: {
    async login(e) {
      e.preventDefault();
      this.v$.$validate();
      console.log(this.v$.email.$errors[0])
      if (!this.v$.$error) {
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
          if (res.user) {
            const user_info = { id: res.user.id, name: res.user.first_name }
            // console.log(res)
            if (user_info) {
              console.log(this.remember)
              this.userStore.setUser(user_info, this.remember)
              this.userStore.setToken(res.token, this.remember)
              if (history.length > 2) {
                router.back()
              } else {
                router.push({ path: '/home' })
              }
            }
          }else{
            this.errorMessage = res.message
          }
        }).catch(console.error);
      }
    }
  }
};
</script>

<template>
  <div id="bg" class="absolute w-full max-h-screen md:max-h-none bg-gray-200 dark:bg-gray-600"></div>
  <div class="absolute w-full h-full md:py-[6%]">
    <div id="login" class="relative text-black opacity-0 md:-translate-y-20">login link</div>
    <!-- LOGIN CARD -->
    <div class="w-full md:w-[55%] lg:w-[38%] md:h-auto dark:md:bg-opacity-95 md:bg-opacity-95 lg:bg-opacity-90 dark:text-gray-200 lg:bg-gray-50 bg-gray-100 dark:bg-gray-700 md:ml-auto md:mr-12 mx-auto px-8 md:px-10 md:py-12 pb-[100%] -mt-6 shadow-sm shadow-gray-500 dark:shadow-gray-800 md:rounded-xl">
      <div class="w-full pt-14 md:pt-0">
        <!-- TITLE -->
        <p class="font-semibold lg:text-[28px] px-12 mx-auto text-3xl dark:text-gray-200 text-gray-700 drop-shadow-sm lg:mb-8 text-center lg:text-center">Sign in</p>
        <!-- EMAIL -->
        <p class="lg:mt-12 mt-10 text-md mb-2" style="font-weight: 500;">Your email</p>
        <input type="email" v-bind:class="[v$.email.$error ? 'ring-2 ring-red-600 dark:ring-2 dark:ring-red-600' : '']"
          class="shadow-sm dark:focus:ring-2 focus:border-yellow-300 focus:ring-yellow-300 focus:outline-none border dark:bg-gray-800 dark:border-gray-800 border-gray-300 py-3 px-3 rounded-lg w-full text-md bg-white"
          v-model="email" placeholder="name@company.com" />
        <!-- EMAIL VALIDATORS -->
        <div v-if="v$.email.$error">
          <div class="-mb-4 text-red-600 pt-1.5 pl-1 text-[15px]" v-for="ev in v$.email.$errors" :key="ev.$validator">
            {{ ev.$validator == 'required' ? 'Email is required' : 'Must be a valid email'}} 
          </div> 
        </div>    
        <!-- PASSWORD -->
        <p class="mt-8 text-md mb-2 relative flex items-center" style="font-weight: 500;">
          Password 
          <button class="absolute right-2" @click="this.showPassword = !this.showPassword">
            <font-awesome-icon v-bind:class="[!showPassword ? 'opacity-100' : 'opacity-0']" icon="fa-solid fa-eye-slash" class="absolute text-gray-800 dark:text-gray-100 pt-1.5"/>
            <font-awesome-icon v-bind:class="[showPassword ? 'opacity-100' : 'opacity-0']" icon="fa-solid fa-eye" class="text-gray-800 dark:text-gray-100 pt-[6px] pl-[1px]"/>
          </button>
        </p>
        <input :type="!showPassword ? 'password' : 'text'" v-bind:class="[v$.password.$error ? 'ring-2 ring-red-600 dark:ring-2 ring:border-red-600' : '']"
          class="py-3 shadow-sm dark:focus:ring-2 focus:border-yellow-300 focus:ring-yellow-300 focus:outline-none border dark:bg-gray-800 dark:border-gray-800 border-gray-300 px-3 rounded-lg w-full text-md bg-white"
          v-model="password" placeholder="•••••••••" />
        <!-- PASSWORD VALIDATORS -->
        <div v-if="v$.password.$error" class="text-red-600 pt-1.5 pl-1 text-[15px]"> Password is required </div>
        <!-- REMEMBER ME + FORGOT PASSWORD -->
        <div class="flex mt-5 px-0.5 grid grid-cols-1 lg:grid-cols-2">
          <div class="flex items-center select-none lg:mt-0 mt-0">
            <!-- REMEMBER CHECKBOX -->
            <div class="-translate-y-0.5">
              <input v-model="remember" id="remember" type="checkbox"
                class="cursor-pointer rounded w-3.5 h-3.5 focus:ring-4 focus:ring-offset-0 focus:ring-gray-50 focus:ring-opacity-0 dark:focus:ring-opacity-0 focus:outline-none text-yellow-300 border border-gray-400 dark:border-gray-600"
                checked>
            </div>
            <label for="remember"
              class="tracking-tight text-md ml-2 dark:text-gray-300 text-gray-500 cursor-pointer hover:opacity-70">Rembember
              me</label>
          </div>
          <!-- FORGET PASSWORD -->
          <div class="lg:text-right mt-9 lg:mt-0 lg:translate-y-0 translate-y-24 text-center">
            <a href="#" class="tracking-tight text-md dark:text-gray-300 text-gray-700 dark:opacity-100 opacity-75 hover:opacity-50 dark:hover:opacity-60">Forgot
              password?</a>
          </div>
        </div>
        <!-- ERROR MESSAGE -->
        <div class="absolute md:relative -translate-y-[40px] md:translate-y-[-55px] lg:translate-y-0 md:mt-4 md:-mb-4 text-sm text-red-600">{{ errorMessage }}</div>
        <!-- SIGN IN BUTTON -->
        <button @click="login"
        class="bg-yellow-300 dark:bg-yellow-300 md:hover:opacity-70 text-white text-lg dark:text-gray-700 font-bold w-full -mt-10 mt-1 md:-mt-10 lg:mt-10 p-2 lg:p-1.5 rounded-lg shadow-md active:translate-y-0.5">Login</button>
        <!-- DONT HAVE ACCOUNT -->
        <p class="lg:mt-10 mt-24 -mb-2 text-md lg:text-md text-gray-500 dark:text-gray-400 lg:text-left text-center">Don't have an account yet? <a href="/signup/#signup"
            class="text-md text-yellow-300 hover:opacity-80 dark:text-yellow-300 font-bold">Sign up</a></p>
      </div>
    </div>
  </div>
</template>


<style>
#bg {
  background-image: url('../assets/login-bg.jpg');
  -webkit-filter: brightness(0.95);
  height: 190%;
  /* background-position: unset; */
  background-repeat: no-repeat;
  background-size: cover;
}

#remember{
  transform: scale(1.2);
}
</style>