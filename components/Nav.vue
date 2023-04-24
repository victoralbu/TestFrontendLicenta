<template>
  <div class="bg-cyan-900 top-0 m-0 w-full h-14 grid grid-cols-3 content-center absolute z-[11] absolute select-none"
       draggable="false">
    <div class="flex flex-col justify-center">
      <div id="location" class="pl-1 md:text-center  text-xl text-white font-bold">{{ location }}</div>
    </div>
    <h1 class="justify-self-center font-bold text-3xl md:text-5xl text-[#439BB6] flex items-center select-none"
        draggable="false">WorkerAPP</h1>
    <div class="cursor-pointer justify-self-end flex items-center select-none" draggable="false"
         @click.prevent="show = !show">
      <img alt="menu" class="select-none w-[50px] md:w-[60px] md:mr-12" draggable="false" src="/assets/icons/menu.svg">
    </div>
  </div>
  <transition enter-active-class="transition duration-700" enter-from-class="opacity-0"
              leave-active-class="transition duration-700" leave-to-class="opacity-0">
    <div v-if="show" class="absolute w-full min-h-screen bg-gray-600/[0.7] z-10"></div>
  </transition>
  <transition name="slide-fade">
    <Menu v-if="show"></Menu>
  </transition>
</template>

<script setup>
import {ref} from 'vue'
import {useDataStore} from "~/services/dataStorage";

let show = ref(false);

let location = useDataStore().location

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