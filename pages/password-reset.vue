<template>
  <section
      class="flex min-h-screen justify-center items-center bg-gradient-to-tr from-[#ffd89b] to-[#19547b] select-none "
      draggable="false">

    <form action="#"
          class="flex flex-col bg-gradient-to-tr from-yellow-100 to-blue-200 w-3/4 md:w-2/5 items-center p-7 gap-4 rounded-xl shadow-lg sm:w-2/4 lg:w-2/5 xl:w-1/4 2xl:w-1/5 "
          method="POST">

      <h1 class="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-yellow-300 text-5xl pb-3 select-none font-medium">
        Reset Password</h1>

      <input id="password" v-model="password"
             align="center"
             class=" w-2/3 rounded-md bg-transparent border-[3px] border-gray-300 focus:border-[3px] focus:outline-0 focus:outline-offset-0 p-1 select-none text-gray-700 px-2"
             name="password"
             placeholder="Password" required
             type="password">

      <input id="password_confirmation" v-model="password_confirmation"
             align="center"
             class=" w-4/5 md:w-2/3 rounded-md bg-transparent border-[3px] border-gray-300 focus:border-[3px] focus:outline-0 focus:outline-offset-0 p-1 select-none text-gray-700 px-2"
             name="password_confirmation"
             placeholder="Password Confirmation" required
             type="password">

      <button
          class=" select-none text-[#81A4B7] bg-transparent border border-solid border-[#81A4B7] hover:bg-[#81A4B7] hover:text-white active:[#81A4B7] font-bold uppercase text-sm px-3 py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150  active show"
          href="#"
          @click.prevent="reset">Reset
      </button>
    </form>

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
import {resetPassword} from "~/services/resetPassword";

export default {
  data() {
    return {
      email                : '',
      password             : '',
      password_confirmation: '',
      token                : '',
      errorMessages        : '',
      visible              : '',
    }
  },
  methods: {
    async reset() {
      const queryString = window.location.search;

      const urlParams = new URLSearchParams(queryString);

      this.errorMessages = await resetPassword({
        'token'                : urlParams.get('token'),
        'email'                : urlParams.get('email'),
        'password'             : this.password,
        'password_confirmation': this.password_confirmation,
      })

      this.visible = true;

      setTimeout(() => {
        this.visible = false
      }, 2000)
    }
  },
}

</script>

<style>

</style>
