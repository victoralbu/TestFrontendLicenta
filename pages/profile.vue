<template>
  <div class="wrapper w-full min-h-screen h-screen max-h-screen select-none" draggable="false">

    <Nav title="/profile"/>
    <div id="scrollable"
         class="mt-14 md:w-1/2 p-4 text-2xl font-mono flex flex-col gap-3 overflow-y-scroll overflow-x-hidden">

      <div class="grid grid-cols-2">
        <h1 class="">Name:</h1>
        <h1 class="editable text-cyan-900 font-bold">{{ useDataStore().name }}</h1>
      </div>
      <hr>
      <div class="sm:grid sm:grid-cols-2">
        <h1 class="">Email:</h1>
        <h1 class="editable text-cyan-900 font-bold">{{ useDataStore().email }}</h1>
      </div>
      <hr>
      <div class="grid grid-cols-2">
        <h1 class="">Phone number:</h1>
        <h1 class="editable text-cyan-900 font-bold">{{ useDataStore().phone_number }}</h1>
      </div>
      <hr>
      <div class="grid grid-cols-2">
        <h1 class="">Jobs done:</h1>
        <h1 class="text-cyan-900 font-bold">{{ useDataStore().jobs_done }}</h1>
      </div>
      <hr>
      <div class="grid grid-cols-2">
        <h1 class="">Rating:</h1>
        <h1 class="text-cyan-900 font-bold">{{ useDataStore().rating }}</h1>
      </div>
      <hr>
      <div class="grid grid-cols-2">
        <h1 class="">Ratings number:</h1>
        <h1 class="text-cyan-900 font-bold">{{ useDataStore().ratings_nr }}</h1>
      </div>
      <hr>
      <div class="w-full flex justify-center">
        <div class="rounded p-2 bg-gray-300 text-center flex flex-col justify-center cursor-pointer" @click.prevent="showEditModal = !showEditModal">
          Edit
        </div>
      </div>
    </div>

  </div>

  <div v-show="showEditModal"
       class="absolute flex flex-col align-middle items-center justify-center z-[12] md:w-[600px] md:px-0 w-11/12 min-h-[150px] max-h-screen-[150px] h-[350px] text-center left-0 right-0 m-auto top-16 bg-gray-200 rounded-md shadow-md gap-4 bg-gray-100 select-none p-3">
    <input id="name" class="w-3/4 sm:w-1/2 p-2 rounded" :value="useDataStore().name"  type="text">
    <input id="email" class="w-3/4 sm:w-1/2 p-2 rounded" :value="useDataStore().email"  type="text">
    <input id="phone_number" class="w-3/4 sm:w-1/2 p-2 rounded" :value="useDataStore().phone_number"  type="text">
    <div class="w-full flex justify-evenly">
      <div
          class="bg-gray-500 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700"
          @click.prevent="showEditModal = !showEditModal">
        Close
      </div>

      <div
          class="bg-gray-400 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700"
          @click.prevent="update()">
        Update
      </div>
    </div>
  </div>
</template>

<script setup>
import Nav from "~/components/Nav.vue";
import {useDataStore} from "~/services/dataStorage";
import {ref} from "vue";

let showEditModal = ref(false);

let config = useRuntimeConfig()

let apiUrl = config.API_URL;
function update(){
  let payload = {
    'name': document.getElementById('name').value,
    'email': document.getElementById('email').value,
    'phone_number': document.getElementById('phone_number').value,
  }
  useFetch(`${apiUrl}/profile`, {
    method     : 'post',
    credentials: 'include',
    body       : payload,
    headers    : {
      'Content-Type': 'application/json',
      'Accept'      : 'application/json',
    },
  }).then(() => {
    window.location.reload();
  })
}

onMounted(() => {
  document.ondblclick = function (e) {
    e.preventDefault();
  }

  window.addEventListener(
      "touchmove",
      function (event) {
        if (event.scale !== 1) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      },
      {passive: false}
  );
})

definePageMeta({
  middleware: ['validate-token']
})

</script>

<style>

body {
  overscroll-behavior: contain;
  overflow: hidden;
}

.wrapper {
  position: fixed;
}

a:active {
  background-color: rgba(128, 128, 128, 0.27);
}

#scrollable::-webkit-scrollbar {
  display: none;
}
</style>