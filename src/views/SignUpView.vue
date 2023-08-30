<script setup>
import router from '@/router';
import { useUserStore } from '../stores/userStore';
import { useVuelidate } from '@vuelidate/core'
import { required, email as email_validator, sameAs, minLength, maxLength } from '@vuelidate/validators'
// import { ref } from 'vue';

// const birthday = ref()

</script>

<script>
export default {
  mounted: () => {
    document.getElementById('signup').scrollIntoView()
  },
  data: () => {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
      birthday: '',
      sex: '',
      userStore: useUserStore(),
      showPassword: false,
      showConfirmPassword: false,
      v$: useVuelidate(),
      errorMessage: null
    };
  },
  validations() {
    return {
      first_name: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(2)
      },
      last_name: {
        required,
        maxLength: maxLength(32),
        minLength: minLength(2)
      },
      email: { required, email_validator },
      birthday: {
        required
      },
      sex: {
        required
      },
      password: { 
        required, 
        minLength: minLength(6),
        secure: function(value) {
          const containsUppercase = /[A-Z]/.test(value)
          const containsLowercase = /[a-z]/.test(value)
          const containsNumber = /[0-9]/.test(value)
          const containsSpecial = /[#?!@$%^&*-]/.test(value)
          return (containsUppercase || containsLowercase) && containsNumber && containsSpecial
        }
      },
      confirm_password: { 
        required,
        sameAs: sameAs(this.password)
      }
    }
  },
  methods: {
    async signin(e) {
      e.preventDefault();
      this.v$.$validate();
      console.log(this.birthday)
      if (!this.v$.$error) {
        const response = await fetch("http://localhost:3000/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            birthday: this.birthday,
            sex: this.sex,
            password: this.password,
          }),
        });
  
        response.json().then((res) => {
          const status_code = response.status
          if (status_code == 200) {
            router.push({ path: '/login' })
            this.$notify({text: res.message, duration: 1500, speed: 800, group: 'auth', title: 'Thank You!'});
          }else{
            this.errorMessage = res.message
            this.$notify({text: res.message, duration: 1500, speed: 2000, group: 'auth_error', title: 'Error'});
          }
        }).catch(console.error);
      }
    }
  },
};
</script>
<!-- password must contain letters, numbers and special characters -->
<template>
  <div id="signup-bg" class="absolute w-full max-h-screen md:max-h-none bg-gray-200 dark:bg-gray-600"></div>
  <div class="absolute w-full h-full md:py-[6%]">
    <div id="signup" class="relative text-black opacity-0 md:-translate-y-14">signup link</div>
    <!-- SIGN UP CARD -->
    <div class="w-full md:w-[55%] lg:w-[40%] md:h-auto dark:md:bg-opacity-95 md:bg-opacity-95 lg:bg-opacity-90 dark:text-gray-300 lg:bg-gray-50 bg-gray-100 dark:bg-gray-700 md:mr-auto md:ml-[8%] mx-auto px-8 md:px-10 md:py-14 pb-[100%] -mt-6 shadow-sm shadow-gray-500 dark:shadow-gray-800 md:rounded-xl">
      <div class="w-full pt-14 md:pt-0">
        <vue-basic-alert :duration="300" :closeIn="300" ref="alert" />
        <!-- TITLE -->
        <p class="lg:text-[30px] font-semibold px-12 mx-auto text-3xl dark:text-gray-200 text-gray-700 drop-shadow-sm lg:mb-8 text-center lg:text-center">Create account</p>
        <div class="grid grid-cols-2">
          <div class="pr-1">
            <!-- FIRST NAME -->
            <p class="lg:mt-4 mt-14 text-md mb-2" style="font-weight: 500;">First name</p>
            <input type="email" v-bind:class="[v$.first_name.$error ? 'ring-2 ring-red-600 dark:ring-2 dark:ring-red-600' : '']"
              class="shadow-sm dark:focus:ring-2 focus:border-yellow-300 focus:ring-yellow-300 focus:outline-none border dark:bg-gray-800 dark:border-gray-800 border-gray-300 py-3 px-3 rounded-lg w-full text-md bg-white"
              v-model="first_name" placeholder="First name" />
            <!-- FIRST NAME VALIDATORS -->
            <div v-if="v$.first_name.$error || true">
              <div class="-mb-4 text-red-600 pt-1.5 pl-1 text-[15px]" v-for="ev in v$.first_name.$errors" :key="ev.$validator">
                {{ ev.$validator == 'required' ? 'Last name is required' : (ev.$validator == 'minLength' ? 'Minimum length is 2 characters' : (ev.$validator == 'maxLength' ? 'Max length is 16 characters' : '')) }} 
              </div> 
            </div>
          </div>
          <div class="pl-1">
            <!-- LAST NAME -->
            <p class="lg:mt-4 mt-14 text-md mb-2" style="font-weight: 500;">Last name</p>
            <input type="email" v-bind:class="[v$.last_name.$error ? 'ring-2 ring-red-600 dark:ring-2 dark:ring-red-600' : '']"
              class="shadow-sm dark:focus:ring-2 focus:border-yellow-300 focus:ring-yellow-300 focus:outline-none border dark:bg-gray-800 dark:border-gray-800 border-gray-300 py-3 px-3 rounded-lg w-full text-md bg-white"
              v-model="last_name" placeholder="Last name" />
            <!-- LAST NAME VALIDATORS -->
            <div v-if="v$.last_name.$error || true">
              <div class="text-red-600 pt-1.5 pl-1 text-[15px]" v-for="ev in v$.last_name.$errors" :key="ev.$validator">
                {{ ev.$validator == 'required' ? 'Last name is required' : (ev.$validator == 'minLength' ? 'Minimum length is 2 characters' : (ev.$validator == 'maxLength' ? 'Max length is 32 characters' : ''))}} 
              </div> 
            </div>
          </div>
        </div>
        <!-- EMAIL -->
        <p class="mt-4 text-md mb-2" style="font-weight: 500;">Email address</p>
        <input type="email" v-bind:class="[v$.email.$error ? 'ring-2 ring-red-600 dark:ring-2 dark:ring-red-600' : '']"
          class="shadow-sm dark:focus:ring-2 focus:border-yellow-300 focus:ring-yellow-300 focus:outline-none border dark:bg-gray-800 dark:border-gray-800 border-gray-300 py-3 px-3 rounded-lg w-full text-md bg-white"
          v-model="email" placeholder="name@company.com" />
        <!-- EMAIL VALIDATORS -->
        <div v-if="v$.email.$error">
          <div class="text-red-600 pt-1.5 pl-1 text-[15px]" v-for="ev in v$.email.$errors" :key="ev.$validator">
            {{ ev.$validator == 'required' ? 'Email is required' : 'Must be a valid email'}} 
          </div> 
        </div> 
        <div class="grid grid-cols-2">
          <div class="pr-1">
            <!-- BIRTHDAY -->
            <p class="mt-4 text-md mb-2" style="font-weight: 500;">Birthday</p>
            <input type="date" v-bind:class="[v$.birthday.$error ? 'ring-2 ring-red-600 dark:ring-2 dark:ring-red-600' : '']" class="dark:[color-scheme:dark] shadow-sm dark:focus:ring-2 focus:border-yellow-300 focus:ring-yellow-300 focus:outline-none border dark:bg-gray-800 dark:border-gray-800 border-gray-300 py-3 px-3 rounded-lg w-full text-md bg-white text-gray-500" v-model="birthday">
            <!-- BIRTHDAY VALIDATORS -->
            <div v-if="v$.birthday.$error">
              <div class="text-red-600 pt-1.5 pl-1 text-[15px]" v-for="ev in v$.birthday.$errors" :key="ev.$validator">
                {{ ev.$validator == 'required' ? 'Birthday is required' : ''}} 
              </div> 
            </div> 
          </div>
          <div class="pl-1 w-full">
            <!-- SEX -->
            <p class="mt-4 text-md mb-2" style="font-weight: 500;">Sex</p>
            <div class="dropdown w-full ">
              <button v-bind:class="[v$.sex.$error ? 'ring-2 ring-red-600 dark:ring-2 dark:ring-red-600' : '']" class="dropbtn pointer focus:ring-yellow-300 focus:outline-none w-full text-left dark:bg-gray-800 bg-white p-3 dark:text-gray-400 text-gray-700 rounded-lg border dark:bg-gray-800 dark:border-gray-800 border-gray-300 flex"><p>{{ !!sex ? sex : 'Select sex:' }}</p><font-awesome-icon icon="fa-solid fa-caret-down" class="text-gray-500 text-md pt-1 ml-auto"/></button>
              <!-- SEX VALIDATORS -->
              <div v-if="v$.sex.$error">
                <div class="-mb-4 text-red-600 pt-1.5 pl-1 text-[15px]" v-for="ev in v$.sex.$errors" :key="ev.$validator">
                  {{ ev.$validator == 'required' ? 'Sex is required' : ''}} 
                </div> 
              </div> 
              <div class="select-none dropdown-content bg-white dark:bg-gray-800 w-full -translate-y-1.5 rounded-b-lg border-t-0 border dark:bg-gray-800 dark:border-gray-800 border-gray-300">
                <a class="border-b border-gray-400 border-opacity-50 text-gray-600 dark:text-gray-300 cursor-pointer hover:bg-gray-200 dark:hover:text-gray-800" @click="this.sex = 'Female'">Female</a>
                <a class="border-b border-gray-400 border-opacity-50 text-gray-600 dark:text-gray-300 cursor-pointer hover:bg-gray-200 dark:hover:text-gray-800" @click="this.sex = 'Male'">Male</a>
                <a class="text-gray-600 dark:text-gray-300 cursor-pointer hover:bg-gray-200 dark:hover:text-gray-800" @click="this.sex = 'Other'">Other</a>
              </div>
            </div>
          </div>
        </div>
        <!-- PASSWORD -->
        <p class="mt-4 text-md mb-2 relative flex items-center" style="font-weight: 500;">
          Password 
          <button class="absolute right-2" @click="this.showPassword = !this.showPassword">
            <font-awesome-icon v-bind:class="[!showPassword ? 'opacity-100' : 'opacity-0']" icon="fa-solid fa-eye-slash" class="absolute text-gray-800 dark:text-gray-100 pt-1.5"/>
            <font-awesome-icon v-bind:class="[showPassword ? 'opacity-100' : 'opacity-0']" icon="fa-solid fa-eye" class="text-gray-800 dark:text-gray-100 pt-[6px] pl-[1px]"/>
          </button>
        </p>
        <input :type="!showPassword ? 'password' : 'text'" v-bind:class="[v$.password.$error ? 'ring-2 ring-red-600 dark:ring-2 dark:ring-red-600' : '']"
          class="shadow-sm dark:focus:ring-2 focus:border-yellow-300 focus:ring-yellow-300 focus:outline-none border dark:bg-gray-800 dark:border-gray-800 border-gray-300 py-3 px-3 rounded-lg w-full text-md bg-white"
          v-model="password" placeholder="•••••••••" />
        <!-- PASSWORD VALIDATORS -->
        <div v-if="v$.password.$error">
          <div class="text-red-600 pt-1.5 pl-1 text-[15px]" v-for="ev in v$.password.$errors" :key="ev.$validator">
            {{ ev.$validator == 'required' ? 'Password is required' : (ev.$validator == 'minLength' ? 'Password must be at least 6 characters' : 'Password must contain letters, numbers and special characters')}} 
          </div> 
        </div> 
        <!-- CONFIRM PASSWORD -->
        <p class="mt-4 text-md mb-2 relative flex items-center" style="font-weight: 500;">
          Confirm password 
          <button class="absolute right-2" @click="this.showConfirmPassword = !this.showConfirmPassword">
            <font-awesome-icon v-bind:class="[!showConfirmPassword ? 'opacity-100' : 'opacity-0']" icon="fa-solid fa-eye-slash" class="absolute text-gray-800 dark:text-gray-100 pt-1.5"/>
            <font-awesome-icon v-bind:class="[showConfirmPassword ? 'opacity-100' : 'opacity-0']" icon="fa-solid fa-eye" class="text-gray-800 dark:text-gray-100 pt-[6px] pl-[1px]"/>
          </button>
        </p>
        <input :type="!showConfirmPassword ? 'password' : 'text'" v-bind:class="[v$.confirm_password.$error ? 'ring-2 ring-red-600 dark:ring-2 dark:ring-red-600' : '']"
          class="shadow-sm dark:focus:ring-2 focus:border-yellow-300 focus:ring-yellow-300 focus:outline-none border dark:bg-gray-800 dark:border-gray-800 border-gray-300 py-3 px-3 rounded-lg w-full text-md bg-white"
          v-model="confirm_password" placeholder="•••••••••" />
        <!-- CONFIRM PASSWORD VALIDATORS -->
        <div v-if="v$.confirm_password.$error">
          <div class="text-red-600 pt-1.5 pl-1 text-[15px]" v-for="ev in v$.confirm_password.$errors" :key="ev.$validator">
            {{ ev.$validator == 'required' ? 'Confirm password is required' : (ev.$validator == 'sameAs' ? 'Both passwords must be the same' : '')}} 
          </div> 
        </div> 
        <!-- BACKEND ERROR -->
        <!-- <div class="mt-6 -mb-4 text-red-500">
          {{ errorMessage }}
        </div> -->
        <!-- SIGN IN BUTTON -->
        <button @click="signin"
          class="mt-12 bg-yellow-300 dark:bg-yellow-300 hover:opacity-70 text-white text-lg dark:text-gray-700 font-bold w-full -mt-10 lg:mt-10 p-2.5 rounded-lg shadow-md active:translate-y-0.5">Sign
          up</button>
        <!-- ALREADY HAVE ACCOUNT -->
        <p class="lg:mt-10 mt-16 -mb-2 text-md lg:text-md text-gray-500 dark:text-gray-400 lg:text-left text-center">Already have an account? <a href="/login"
            class="text-md text-yellow-300 hover:opacity-60 dark:hover:opacity-80 dark:text-yellow-300 font-bold">Sign in</a></p>
      </div>
    </div>
  </div>
</template>


<style>
#signup-bg {
  background-image: url('../assets/login-bg2.jpg');
  -webkit-filter: brightness(0.95);
  height: 170%;
  /* background-position: unset; */
  background-repeat: no-repeat;
  background-size: cover;
}

#remember{
  transform: scale(1.2);
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  /* background-color: rgba(40, 40, 40, 0.91); */
}

</style>