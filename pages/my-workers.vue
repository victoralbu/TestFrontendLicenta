<template>
  <div class="wrapper w-full bg-gray-50 min-h-screen h-screen max-h-screen select-none" draggable="false">
    <Nav title="/myWorkers"/>
    <div class="mt-14 w-full h-full flex justify-center">

      <ul id="scrollable" class="h-[77%] mt-2 sm:h-[95%] w-11/12 md:w-1/3 overflow-y-scroll rounded">
        <li v-for="user in workers" class="bg-gray-300 flex justify-center mb-2 rounded">
          <div class="flex flex-col justify-center text-center p-3">
            <h1 class="font-bold">{{ user.name }}</h1>
            <h1 class="font-bold">{{ user.email }}</h1>
            <h1 class="font-bold">{{ user.phone_number }}</h1>
            <div class="w-full flex justify-evenly gap-3">
              <div v-show="user.status === 'Done'"
                   class="bg-gray-500 p-3 font-bold rounded-md cursor-pointer active:bg-gray-400 hover:text-gray-700 text-green-400"
                   @click.prevent="pay(user.amount, user.job_id)">Pay:
                {{ user.amount }} Euro
              </div>

              <div
                  class="bg-gray-500 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700 flex flex-col justify-center"
                  @click.prevent="navigateTo(`/bid/${user.job_id}`)">View
              </div>

              <div v-show="user.status !== 'Done' || user.status !== 'Paid'"
                   class="bg-gray-500 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700 flex flex-col justify-center"
                   @click.prevent="currentUser = user;showRateModal = !showRateModal">Rate
              </div>

              <div v-show="user.status !== 'Done' || user.status !== 'Paid'"
                   class="bg-gray-500 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700 flex flex-col justify-center"
                   @click.prevent="currentUser = user;showReportModal = !showReportModal">Report
              </div>
            </div>
          </div>
        </li>
      </ul>

    </div>
  </div>

  <div v-show="showRateModal"
       class="absolute flex flex-col align-middle items-center justify-center z-[12] md:w-[600px] md:px-0 w-11/12 min-h-[250px] max-h-[450px] h-[350px] text-center left-0 right-0 m-auto top-16 bg-gray-200 rounded-md shadow-md gap-4 bg-gray-100 select-none p-3"
       draggable="false">

    <div
        class="w-32 h-12 bg-gray-600 flex justify-center items-center text-white rounded overflow-hidden p-3 font-bold">
      {{ currentUser.name }}
    </div>
    <div class="">
      <input id="rate" class="p-2 rounded min-w-[100px]" max="5" min="0" placeholder="Rating" step="1" type="number">
    </div>

    <div class="w-full flex justify-evenly">
      <div
          class="bg-gray-500 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700"
          @click.prevent="showRateModal = !showRateModal">
        Close
      </div>

      <div
          class="bg-gray-400 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700"
          @click.prevent="rate(currentUser.id)">
        Rate
      </div>
    </div>
  </div>
  <div v-show="showReportModal"
       class="absolute flex flex-col align-middle items-center justify-center z-[12] md:w-[600px] md:px-0 w-11/12 min-h-[250px] max-h-[450px] h-[350px] text-center left-0 right-0 m-auto top-16 bg-gray-200 rounded-md shadow-md gap-4 bg-gray-100 select-none p-3"
       draggable="false">

    <div
        class="w-32 h-12 bg-gray-600 flex justify-center items-center text-white rounded overflow-hidden p-3 font-bold">
      {{ currentUser.name }}
    </div>
    <div class="">
      <textarea id="report-description" class=" p-2 rounded m-5" maxlength="500" placeholder="Description"></textarea>
    </div>

    <div class="w-full flex justify-evenly">
      <div
          class="bg-gray-500 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700"
          @click.prevent="showReportModal = !showReportModal">
        Close
      </div>

      <div
          class="bg-gray-400 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700"
          @click.prevent="report(currentUser.id)">
        Report
      </div>
    </div>
  </div>

</template>

<script setup>
import Nav from "~/components/Nav.vue";
import {ref} from "vue";
import {getWorkers} from "~/services/getWorkers";

let workers = ref(await getWorkers());

let config = useRuntimeConfig()

let apiUrl = config.API_URL;

let uri    = window.location.search.substring(1);
let params = new URLSearchParams(uri);
let status = params.get("status");

let showRateModal = ref(false);

let showReportModal = ref(false);

let currentUser = ref('');

if (status === 'Good') {
  useFetch(`${apiUrl}/jobs/paid`, {
    method     : 'post',
    credentials: 'include',
    headers    : {
      'Content-Type': 'application/json',
      'Accept'      : 'application/json',
    },
    body       : {
      'job_id': localStorage.getItem('current-job')
    },
  }).then(() => {
    localStorage.setItem('current-job', null)
    navigateTo('/')
  })
}

function rate(id) {

  useFetch(`${apiUrl}/rate`, {
    method     : 'post',
    credentials: 'include',
    headers    : {
      'Content-Type': 'application/json',
      'Accept'      : 'application/json',
    },
    body       : {
      'user_id': id,
      'rate'   : document.getElementById('rate').value,
    },
  }).then(() => {
    window.location.reload();
  })
}

function report(id) {

  useFetch(`${apiUrl}/reports`, {
    method     : 'post',
    credentials: 'include',
    headers    : {
      'Content-Type': 'application/json',
      'Accept'      : 'application/json',
    },
    body       : {
      'culprit_id' : id,
      'description': document.getElementById('report-description').value,
    },
  }).then(() => {
    window.location.reload();
  })
}

function pay(amount, job_id) {
  localStorage.setItem('current-job', job_id);
  useFetch(`${apiUrl}/handle-payment`, {
    method     : 'post',
    credentials: 'include',
    body       : {
      'amount': amount
    },
  }).then((r) => {
    navigateTo(r.data.value.href, {external: true})
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