<template>
  <div class="bg-cyan-900 top-0 m-0 w-full h-14 grid grid-cols-5 content-center absolute z-[11] absolute">
    <a></a>
    <a></a>
    <h1 class="justify-self-center font-bold text-3xl md:text-5xl text-[#439BB6] flex items-center select-none"
        draggable="false">WorkerAPP</h1>
    <a></a>
    <a class="cursor-pointer justify-self-end flex items-center select-none" draggable="false"
       @click.prevent="show = !show">
      <img alt="menu" class="select-none w-[50px] md:w-[60px] md:mr-12" draggable="false" src="/assets/icons/menu.svg">
    </a>
  </div>
  <transition enter-active-class="transition duration-700" enter-from-class="opacity-0"
              leave-active-class="transition duration-700" leave-to-class="opacity-0">
    <div v-if="show" class="absolute w-full min-h-screen bg-gray-600/[0.7] z-10"></div>
  </transition>
  <transition name="slide-fade">
    <Menu v-if="show"></Menu>
  </transition>
</template>

<script>
import {logout} from "~/services/auth";

export default {
  name   : "Nav",
  methods: {
    logout,
    openMenu() {
      let menuElement = document.getElementById('menu')
      menuElement.classList.contains('hidden') ? menuElement.classList.remove('hidden') : menuElement.classList.add('hidden')
    }
  },
  data() {
    return {
      show: false
    }
  }
}

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