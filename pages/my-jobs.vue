<template>
  <div class="wrapper w-full bg-gradient-to-tr min-h-screen h-screen max-h-screen select-none" draggable="false">
    <Nav title="/myJobs"/>
    <div class="mt-14 w-full h-full flex justify-center">

      <ul id="scrollable" class="h-[77%] mt-2 sm:h-[95%] w-11/12 md:w-1/3 overflow-y-scroll rounded">
        <li v-for="job in jobs" class="bg-gray-300 justify-center mb-2 rounded p-3">
          <div class="flex flex-col justify-center text-center">
            <h1 class="text-center font-bold text-2xl p-3">{{ job.title }}</h1>
          </div>
          <div class="w-full flex justify-evenly">
            <div
                class="bg-gray-500 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700"
                @click.prevent="showModal = !showModal; currentJob = job.id" v-show="job.status !== 'Done'">
              Finish
            </div>
            <div class="bg-gray-400 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700"
                @click.prevent="navigateTo(`/bid/${job.id}`)">
              View
            </div>
          </div>
        </li>
      </ul>

    </div>
  </div>

  <div v-show="showModal"
       class="absolute flex flex-col align-middle items-center justify-center z-[12] md:w-[600px] md:px-0 w-11/12 min-h-[150px] max-h-screen-[150px] h-[350px] text-center left-0 right-0 m-auto top-16 bg-gray-200 rounded-md shadow-md gap-4 bg-gray-100 select-none p-3">
    <h1 class="text-center font-bold text-2xl">Are you sure?</h1>
    <div class="w-full flex justify-evenly">
      <div
          class="bg-gray-500 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700"
          @click.prevent="finishJob(currentJob)">
        Yes
      </div>

      <div
          class="bg-gray-400 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700 w-16"
          @click.prevent="showModal = !showModal">
        No
      </div>
    </div>
  </div>
</template>

<script setup>
import Nav from "~/components/Nav.vue";
import {ref} from "vue";
import {getMyJobs} from "~/services/getJobs";

let jobs = ref(await getMyJobs());

let config = useRuntimeConfig()

let apiUrl = config.API_URL;

let showModal = ref(false);

let currentJob = ref(false);

function finishJob(id) {
  useFetch(`${apiUrl}/jobs/finish`, {
    method     : 'post',
    credentials: 'include',
    body       : {'job_id': id},
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