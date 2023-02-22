<template>

  <section
      class="flex min-h-screen justify-center items-center bg-gradient-to-tr from-[#ffd89b] to-[#19547b] select-none "
      draggable="false">

    <form action="#"
          class="flex flex-col bg-gradient-to-tr from-yellow-100 to-blue-200 w-3/4 md:w-2/5 items-center p-7 gap-4 rounded-xl shadow-lg sm:w-2/4 lg:w-2/5 xl:w-1/4 2xl:w-1/5 "
          method="POST">

      <img alt="tools" class="opacity-80" draggable="false" height="50"
           src="/assets/images/tools.svg" width="50"/>

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
  </section>

  <transition enter-active-class="transition duration-700" enter-from-class="opacity-0"
              leave-active-class="transition duration-700"
              leave-from-class="opacity-0">

    <ul v-if="errorMessages" class="absolute top-3 right-3  -translate-x-1/2 left-1/2 sm:-translate-x-0 sm:left-auto">
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
    }
  },
  methods: {
    async register() {
      this.errorMessages = null;
      this.errorMessages = await register({
        'name': this.name,
        'email': this.email,
        'phone_number': this.phone_number,
        'password': this.password,
        'password_confirmation': this.password_confirmation,
      })
    }
  },
}

definePageMeta({
  middleware: ['auth']
})

</script>

<style>

</style>