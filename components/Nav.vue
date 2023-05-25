<template>
  <div class="bg-cyan-900 top-0 m-0 w-full h-14 grid grid-cols-3 content-center absolute z-[11] absolute select-none"
       draggable="false">
    <div class="flex flex-col justify-center" @click.prevent="showLocationInput = !showLocationInput">
      <div id="location" class="pl-1 md:text-center text-xl text-white font-bold">{{ useDataStore().location }}</div>
    </div>
    <h1 class="justify-self-center font-bold text-3xl md:text-5xl text-[#439BB6] flex items-center select-none cursor-pointer"
        draggable="false"
        @click.prevent="refresh">{{title || 'WorkerApp'}}</h1>
    <div class="cursor-pointer justify-self-end flex items-center select-none" draggable="false"
         @click.prevent="show = !show">
      <img alt="menu" class="select-none w-[50px] md:w-[60px] md:mr-12" draggable="false" src="/assets/icons/menu.svg">
    </div>
  </div>
  <transition enter-active-class="transition duration-700" enter-from-class="opacity-0"
              leave-active-class="transition duration-700" leave-to-class="opacity-0">
    <div v-if="show || showLocationInput" class="absolute w-full min-h-screen bg-gray-600/[0.7] z-10"
         @click="show = false;showLocationInput = false"></div>
  </transition>
  <transition name="slide-fade">
    <Menu v-if="show"></Menu>
  </transition>
  <div v-show="showLocationInput"
       class="absolute flex flex-col align-middle items-center justify-center z-[12] md:w-[600px] md:px-0 w-11/12 min-h-[150px] max-h-screen-[150px] h-[150px] text-center left-0 right-0 m-auto top-16 bg-gray-100 rounded-md shadow-md gap-4 bg-gray-100 select-none"
       draggable="false">
    <input id="input" class="pl-1 text-center md:text-xl font-bold w-4/5 bg-gray-300 rounded-md min-h-[50px]"
           type="text"
           @focus="clearInput">
    <div
        class="bg-gray-500 self-end md:mr-16 mr-10 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700"
        @click.prevent="showLocationInput = !showLocationInput">
      Close
    </div>
  </div>

</template>

<script setup>
import {ref} from 'vue'
import {useDataStore} from "~/services/dataStorage";
import {loadUserInfo} from "~/services/loadData";
import {Loader} from '@googlemaps/js-api-loader';

let showLocationInput = ref(false);
let show              = ref(false);

await loadUserInfo();

let props = defineProps(['refreshData','title'])

const loader = new Loader({
  apiKey   : "AIzaSyCRfsJ4SHrgKLZJI17qoej0JFoPZiR_O2s",
  version  : "weekly",
  language : "en",
  libraries: ["places"],
});

function clearInput() {
  document.getElementById('input').value = ''
}

function refresh() {
  window.location = '/';
}

onMounted(() => {
  loader.load().then((google) => {
    let locationInputElement = document.getElementById('input')

    let autocomplete = new google.maps.places.Autocomplete(locationInputElement, {types: ['(cities)']})

    autocomplete.addListener("place_changed", () => {
      useDataStore().location = autocomplete.getPlace('city').name;
      if (props.refreshData)
        props.refreshData();
    })

  }).catch(e => {
    console.log(e)
  })
})

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Courgette&display=swap');

h1 {
  font-family: 'Courgette', cursive;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(200px);
  opacity: 0;
}

</style>