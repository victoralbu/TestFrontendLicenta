<template>
  <div class="wrapper w-full min-h-screen h-screen max-h-screen select-none" draggable="false">

    <Nav title="/myBids"/>
    <div class="mt-14 flex justify-center h-[78%] sm:h-[93%] rounded">
      <ul id="scrollable" class="m-2 w-11/12 md:w-1/2 overflow-y-scroll rounded">
        <li v-for="bid in bids" v-show="bids"
            :class="{ 'bg-red-200': bid.status === 'Lost','bg-yellow-100': bid.status === 'In Progress','bg-green-300': bid.status === 'Won' }"
            class=" cursor-pointer bg-gray-100 p-2 m-2 rounded"
            @click.prevent="openModal(bid); showBidderModal = !showBidderModal">
          <div class="w-full grid grid-cols-3 grid-rows-2 gap-3">
            <div class="h-12 bg-gray-600 flex justify-center items-center text-white rounded overflow-hidden ">
              {{ bid.job.user.name }}
            </div>
            <div class="flex ">
              <div class="flex flex-col">
                <h1 class="basis-1/4 text-slate-400">Price:</h1>
                <h1 class="basis-3/4">{{ bid.money }} Euro</h1>
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
            <div class="flex">
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

  <div v-show="showBidderModal"
       class="absolute flex flex-col align-middle items-center justify-center z-[12] md:w-[600px] md:px-0 w-11/12 min-h-[150px] max-h-screen-[150px] h-[250px] text-center left-0 right-0 m-auto top-16 bg-gray-200 rounded-md shadow-md gap-4 bg-gray-100 select-none p-3"
       draggable="false">
    <h1 class="text-center font-bold">Few words:</h1>

    <div class="p-2 text-center">{{ currentBid.few_words }}</div>

    <div class="w-full flex justify-evenly">
      <div
          class="bg-gray-500 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700"
          @click.prevent="navigateTo(`/bid/${currentBid.job.id}`)">
        Show post
      </div>
      <div
          class="bg-gray-500 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700"
          @click.prevent="showBidderModal = !showBidderModal">
        Close
      </div>
    </div>
  </div>

</template>

<script setup>
import Nav from "~/components/Nav.vue";
import {ref} from "vue";
import {getMyBids} from "~/services/getBids";

let bids = ref(await getMyBids());

let showBidderModal = ref(false)

let currentBid = ref('');

function openModal(bid) {
  currentBid = bid;
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