<template>
  <div class="wrapper w-full bg-gray-50 min-h-screen h-screen max-h-screen select-none" draggable="false">
    <Nav></Nav>
    <div v-show="post" class="mt-14 h-[80%] sm:h-[95%] w-full flex flex-col md:flex-row">
      <div id="container" class="basis-1/2 p-4 text-2xl font-mono flex flex-col gap-3 overflow-y-scroll">
        <div v-show="post.status === 'Bidding' && post.user.id !== useDataStore().id && showBidButton"
             class="w-full bg-gray-600 text-center text-white rounded font-bold cursor-pointer"
             @click.prevent="showBidModal = !showBidModal">BID
        </div>
        <div class="grid grid-cols-2">
          <h1 class="">User:</h1>
          <h1 class="text-cyan-900 font-bold">{{ post.user.name }}</h1>
        </div>
        <hr>
        <div class="grid grid-cols-2">
          <h1 class="">Title:</h1>
          <h1 class="text-cyan-900 font-bold">{{ post.title }}</h1>
        </div>
        <hr>
        <div class="grid grid-cols-2">
          <h1 class="">City:</h1>
          <h1 class="text-cyan-900 font-bold">{{ post.city }}</h1>
        </div>
        <hr>
        <div class="grid grid-cols-2">
          <h1 class="">Address:</h1>
          <h1 class="text-cyan-900 font-bold">{{ post.address }}</h1>
        </div>
        <hr>
        <div class=" md:grid md:grid-cols-2">
          <h1 class="">Description:</h1>
          <h1 class="text-cyan-900 break-words font-bold">{{ post.description }}</h1>
        </div>
        <hr>
        <div class="grid grid-cols-2">
          <h1 class="">Difficulty:</h1>
          <h1 class="text-cyan-900 font-bold">{{ post.level }}</h1>
        </div>
        <hr>
        <div class="grid grid-cols-2">
          <h1 class="">Status:</h1>
          <h1 class="text-cyan-900 font-bold">{{ post.status }}</h1>
        </div>
        <hr>
        <div class="grid grid-cols-2">
          <h1 class="">Urgency:</h1>
          <h1 class="text-cyan-900 font-bold">{{ post.urgency }}</h1>
        </div>
        <hr>
        <div class="grid grid-cols-2">
          <h1 class="">Budget:</h1>
          <h1 class="text-cyan-900 font-bold">{{ post.budget || 'No budget' }}</h1>
        </div>
        <hr>
      </div>
      <div class="basis-1/2 w-full flex-col justify-center overflow-y-scroll p-3 rounded">
        <ul class="m-2">
          <li v-for="bid in bids" v-show="bids" class=" cursor-pointer bg-gray-100 p-2 m-2 rounded"
              @click.prevent="openModal(bid); showBidderModal = !showBidderModal">
            <div class="w-full grid grid-cols-3 grid-rows-2 gap-3">
              <div class="h-12 bg-gray-600 flex justify-center items-center text-white rounded overflow-hidden ">
                {{ bid.user.name }}
              </div>
              <div class="flex ">
                <div class="flex flex-col">
                  <h1 class="basis-1/4 text-slate-400">Price:</h1>
                  <h1 class="basis-3/4">{{ bid.money }} Lei</h1>
                </div>
              </div>
              <div class="flex ">
                <div class="flex flex-col">
                  <h1 class="basis-1/4 text-slate-400">Date:</h1>
                  <h1 v-show="bid.date" class="basis-3/4">{{ bid.date }}</h1>
                </div>
              </div>
              <div class="flex ">
                <div class="flex flex-col p-3">
                </div>
              </div>
              <div class="flex ">
                <div class="flex flex-col">
                  <h1 class="basis-1/4 text-slate-400">Status:</h1>
                  <h1 class="basis-3/4">{{ bid.status }}</h1>
                </div>
              </div>
              <div class="flex ">
                <div class="flex flex-col">
                  <h1 class="basis-1/4 text-slate-400">Date posted:</h1>
                  <h1 class="basis-3/4">{{ bid.created_at }}</h1>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-show="showBidderModal"
       class="absolute flex flex-col align-middle items-center justify-center z-[12] md:w-[600px] md:px-0 w-11/12 min-h-[150px] max-h-screen-[150px] h-[250px] text-center left-0 right-0 m-auto top-16 bg-gray-200 rounded-md shadow-md gap-4 bg-gray-100 select-none p-3"
       draggable="false">

    <div
        class="w-32 h-12 bg-gray-600 flex justify-center items-center text-white rounded overflow-hidden p-3 font-bold">
      {{ currentBidUser.name }}
    </div>

    <div class="p-2 text-center">{{ currentBid.few_words }}</div>

    <div class="w-full flex justify-evenly">
      <div
          class="bg-gray-500 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700"
          @click.prevent="showBidderModal = !showBidderModal">
        Close
      </div>

      <div v-show="post.user.id === useDataStore().id && post.winner === null"
           class="bg-gray-400 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700"
           @click.prevent="accept(currentBid.id)">
        Accept
      </div>
    </div>
  </div>

  <div v-show="showBidModal"
       class="absolute flex flex-col align-middle items-center justify-center z-[12] md:w-[600px] md:px-0 w-11/12 min-h-[150px] max-h-screen-[150px] h-[350px] text-center left-0 right-0 m-auto top-16 bg-gray-200 rounded-md shadow-md gap-4 bg-gray-100 select-none p-3">
    <input id="money" class="w-1/2 p-2 rounded" min="0" placeholder="Amount in LEI" step="any" type="number">
    <textarea id="few_words" class="w-2/3 p-2 rounded m-5" maxlength="500" placeholder="Few words"></textarea>
    <input id="datePicker" class="w-1/2 rounded" min="2023-01-01" type="date" value="2023-01-01">
    <div class="w-full flex justify-evenly">
      <div
          class="bg-gray-500 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700"
          @click.prevent="showBidModal = !showBidModal">
        Close
      </div>

      <div
          class="bg-gray-400 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700"
          @click.prevent="bid">
        BID
      </div>
    </div>
  </div>

  <transition enter-active-class="transition duration-700" enter-from-class="opacity-0"
              leave-active-class="transition duration-700" leave-to-class="opacity-0">
    <div v-if="showBidderModal || showBidModal"
         class="absolute w-full min-h-screen bg-gray-600/[0.7] z-10 fixed select-none" draggable="false"
         @click="showBidModal = false;showBidderModal = false"></div>
  </transition>
</template>

<script setup>

import {getPost} from "~/services/getPost";
import {getBids} from "~/services/getBids";
import {ref} from "vue";
import {useDataStore} from "~/services/dataStorage";

const route = useRoute();

const id = route.params.id;

let showBidderModal = ref(false);

let showBidModal = ref(false);

let showBidButton = ref(true);

let currentBid = ref('');

let currentBidUser = ref('');

let config = useRuntimeConfig()

let apiUrl = config.API_URL;

function accept(id) {
  let payload = {
    'bid': id,
  }
  useFetch(`${apiUrl}/bids/win`, {
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

function bid() {
  let payload = {
    'job_id'   : id,
    'money'    : document.getElementById('money').value || 0,
    'date'     : document.getElementById('datePicker').value,
    'few_words': document.getElementById('few_words').value || 'None',
  }
  useFetch(`${apiUrl}/bids`, {
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

function openModal(bid) {
  currentBid     = bid;
  currentBidUser = bid.user;
}

let post = ref(await getPost(id));
let bids = ref(await getBids(id));

for (let bid of bids.value) {
  if (bid.user.id === useDataStore().id)
    showBidButton = false;
}

onMounted(() => {
  document.getElementById('datePicker').min   = new Date().toISOString().split('T')[0]
  document.getElementById('datePicker').value = new Date().toISOString().split('T')[0]

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

#container::-webkit-scrollbar {
  display: none;
}

</style>