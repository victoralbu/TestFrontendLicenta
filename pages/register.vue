<template>

  <section
      class="flex min-h-screen justify-center items-center bg-gradient-to-tr from-[#ffd89b] to-[#19547b] select-none "
      draggable="false">

    <form action="#"
          class="flex flex-col bg-gradient-to-tr from-yellow-100 to-blue-200 w-3/4 md:w-2/5 items-center p-7 gap-4 rounded-xl shadow-lg sm:w-2/4 lg:w-2/5 xl:w-1/4 2xl:w-1/5 "
          method="POST">

      <img alt="tools" class="opacity-80" draggable="false" height="50"
           src="/assets/icons/tools.svg" width="50"/>

      <h1 class="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-yellow-300 text-5xl pb-3 select-none font-medium">
        Register!</h1>

      <input id="name" v-model="name"
             class=" w-4/5 md:w-2/3 rounded-md bg-transparent border-[3px] border-gray-300 focus:border-[3px] focus:outline-0 focus:outline-offset-0 p-1 select-none text-gray-700 px-2"
             name="name" placeholder="Name"
             required>
      <input id="email" v-model="email" autocomplete="email"
             class=" w-4/5 md:w-2/3 rounded-md bg-transparent border-[3px] border-gray-300 focus:border-[3px] focus:outline-0 focus:outline-offset-0 p-1 select-none text-gray-700 px-2"
             name="email" placeholder="Email"
             required
             type="email">
      <input id="phone_number" v-model="phone_number"
             class=" w-4/5 md:w-2/3 rounded-md bg-transparent border-[3px] border-gray-300 focus:border-[3px] focus:outline-0 focus:outline-offset-0 p-1 select-none text-gray-700 px-2"
             name="phone_number" placeholder="Phone number"
             required>
      <input id="password" v-model="password"
             class=" w-4/5 md:w-2/3 rounded-md bg-transparent border-[3px] border-gray-300 focus:border-[3px] focus:outline-0 focus:outline-offset-0 p-1 select-none text-gray-700 px-2"
             name="password" placeholder="Password"
             required
             type="password">

      <input id="password_confirmation" v-model="password_confirmation"
             align="center"
             class=" w-4/5 md:w-2/3 rounded-md bg-transparent border-[3px] border-gray-300 focus:border-[3px] focus:outline-0 focus:outline-offset-0 p-1 select-none text-gray-700 px-2"
             name="password_confirmation"
             placeholder="Password Confirmation" required
             type="password">

      <div class="flex items-center gap-2 mt-1 text-left">

        <a class=" py-3 px-2 opacity-20 hover:opacity-50 ease-linear transition-all duration-150  active show"
           href="/login">Or
          sign in</a>

        <button class=" select-none text-[#81A4B7] bg-transparent border border-solid border-[#81A4B7] hover:bg-[#81A4B7] hover:text-white active:[#81A4B7] font-bold uppercase text-sm px-3 py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150  active show"
           href="#"
           @click.prevent="register">Register
        </button>

      </div>
    </form>
    <div v-if="loading" class="absolute w-full min-h-screen bg-gray-600/[0.7] z-10 fixed select-none" draggable="false"
    ><div class="sk-chase absolute top-64 z-[11] m-auto select-none" draggable="false" v-show="loading">
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
    </div></div>

  </section>


  <transition enter-active-class="transition duration-700" enter-from-class="opacity-0"
              leave-active-class="transition duration-700" leave-to-class="opacity-0">

    <ul v-if="errorMessages && visible"
        class="absolute top-3 right-3 -translate-x-1/2 left-1/2 sm:-translate-x-0 sm:left-auto">
      <li v-for="message in errorMessages"
          class="font-semibold text-gray-200 text-center select-none bg-indigo-400 py-2.5 px-3 rounded shadow-md m-2">
        {{ message }}
      </li>
    </ul>
  </transition>

</template>

<script>

import {register} from "~/services/auth";
export default {
  data() {
    return {
      name: '',
      email: '',
      phone_number: '',
      password: '',
      password_confirmation: '',
      errorMessages: '',
      visible: '',
      loading: false,
    }
  },
  methods: {
    async register() {
      this.loading = true;
      this.errorMessages = await register({
        'name': this.name,
        'email': this.email,
        'phone_number': this.phone_number,
        'password': this.password,
        'password_confirmation': this.password_confirmation,
      })
      this.loading = false;
      this.visible = true;
      setTimeout(() => {
        this.visible = false
      }, 2000)
    }
  },
}

definePageMeta({
  middleware: ['validate-token','no-auth']
})

</script>

<style>
.sk-chase {
  width: 80px;
  height: 80px;
  position: relative;
  animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: sk-chase-dot 2.0s infinite ease-in-out both;
}

.sk-chase-dot:before {
  content: '';
  display: block;
  width: 25%;
  height: 25%;
  background-color: #ffffff;
  border-radius: 100%;
  animation: sk-chase-dot-before 2.0s infinite ease-in-out both;
}

.sk-chase-dot:nth-child(1) {
  animation-delay: -1.1s;
}

.sk-chase-dot:nth-child(2) {
  animation-delay: -1.0s;
}

.sk-chase-dot:nth-child(3) {
  animation-delay: -0.9s;
}

.sk-chase-dot:nth-child(4) {
  animation-delay: -0.8s;
}

.sk-chase-dot:nth-child(5) {
  animation-delay: -0.7s;
}

.sk-chase-dot:nth-child(6) {
  animation-delay: -0.6s;
}

.sk-chase-dot:nth-child(1):before {
  animation-delay: -1.1s;
}

.sk-chase-dot:nth-child(2):before {
  animation-delay: -1.0s;
}

.sk-chase-dot:nth-child(3):before {
  animation-delay: -0.9s;
}

.sk-chase-dot:nth-child(4):before {
  animation-delay: -0.8s;
}

.sk-chase-dot:nth-child(5):before {
  animation-delay: -0.7s;
}

.sk-chase-dot:nth-child(6):before {
  animation-delay: -0.6s;
}

@keyframes sk-chase {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes sk-chase-dot {
  80%, 100% {
    transform: rotate(360deg);
  }
}

@keyframes sk-chase-dot-before {
  50% {
    transform: scale(0.4);
  }
  100%, 0% {
    transform: scale(1.0);
  }
}
</style>