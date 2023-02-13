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
        Log in!</h1>

      <input id="email" v-model="email" autocomplete="email"
             class=" w-2/3 rounded-md bg-transparent border-[3px] border-gray-300 focus:border-[3px] focus:outline-0 focus:outline-offset-0 p-1 select-none text-gray-700 px-2"
             name="email" placeholder="Email"
             required
             type="email">

      <input id="password" v-model="password"
             align="center"
             class=" w-2/3 rounded-md bg-transparent border-[3px] border-gray-300 focus:border-[3px] focus:outline-0 focus:outline-offset-0 p-1 select-none text-gray-700 px-2"
             name="password"
             placeholder="Password" required
             type="password">

      <div class="flex items-center gap-2 mt-1 text-left">

        <a class=" py-3 px-2 opacity-20 hover:opacity-50 ease-linear transition-all duration-150  active show"
           href="/register">Or
          register</a>

        <a class=" select-none text-[#81A4B7] bg-transparent border border-solid border-[#81A4B7] hover:bg-[#81A4B7] hover:text-white active:[#81A4B7] font-bold uppercase text-sm px-3 py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150  active show"
           href="#"
           @click.prevent="login">Sign
          in</a>

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
import {login} from "~/services/auth";

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessages: '',
    }
  },
  methods: {
    async login() {
      this.errorMessages = await login({
        'email': this.email,
        'password': this.password,
      })
    },
  }
}


definePageMeta({
  middleware: ['auth']
})

</script>

<style>

</style>
