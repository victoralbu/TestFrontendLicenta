<template>
  <section
      class="flex min-h-screen justify-center items-center bg-gradient-to-tr from-[#ffd89b] to-[#19547b] select-none "
      draggable="false">

    <form action="#"
          class="flex flex-col bg-gradient-to-tr from-yellow-100 to-blue-200 w-3/4 md:w-2/5 items-center p-7 gap-4 rounded-xl shadow-lg sm:w-2/4 lg:w-2/5 xl:w-1/4 2xl:w-1/5 "
          method="POST">

      <img alt="tools" class="opacity-80" draggable="false" height="50"
           src="/assets/icons/tools.svg" width="50"/>

      <h1 class="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-yellow-300 text-4xl md:text-5xl pb-3 select-none font-medium">
        Send reset link</h1>

      <input id="email" v-model="email" autocomplete="email"
             class=" w-3/4 rounded-md bg-transparent border-[3px] border-gray-300 focus:border-[3px] focus:outline-0 focus:outline-offset-0 p-1 select-none text-gray-700 px-2"
             name="email" placeholder="Email"
             required
             type="email">

      <div class="flex items-center gap-2 mt-1 text-left">

        <a class=" py-3 px-2 opacity-20 hover:opacity-50 ease-linear transition-all duration-150  active show"
           href="/login">Login
        </a>

        <button id="send"
                class=" select-none text-[#81A4B7] bg-transparent border border-solid border-[#81A4B7] hover:bg-[#81A4B7] hover:text-white active:[#81A4B7] font-bold uppercase text-sm px-3 py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150  active show"
                href="#"
                @click.prevent="sent">Send
        </button>

      </div>

    </form>

  </section>
</template>

<script setup>

import {ref} from "vue";
import {forgotPassword} from "~/services/auth";

let email = ref(null);

async function sent() {
  let sendButtonElement = document.getElementById('send');

  sendButtonElement.innerText             = 'Sent';
  sendButtonElement.disabled              = 'true';
  sendButtonElement.style.backgroundColor = '#B6FEAB';
  await forgotPassword({'email': email})
}
</script>

<style scoped>

</style>