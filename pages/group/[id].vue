<template>
  <div class="wrapper w-full bg-gradient-to-tr from-[#ffd89b] to-[#19547b] min-h-screen h-screen max-h-screen">

    <Nav title="/group/{id}"/>
    <Post ref="post" class="mt-14 select-none" draggable="false" my-posts="2"/>

    <a class=" bg-transparent fixed rotate-45 bottom-8 right-3 rounded md:bottom-8 md:right-8  bg-white/[0.9] w-[50px] h-[50px] z-10 select-none shadow-md md:w-[100px] md:h-[100px] "
       draggable="false"
       @click.prevent="redirect(this.$route.params.id)" style="-webkit-tap-highlight-color: transparent !important;outline: none !important;">
      <img alt="plus"
           class="w-[50px] md:w-[100px] rotate-45 select-none"
           draggable="false" src="/assets/icons/plus.svg"></a>

  </div>
</template>

<script setup>
import Nav from "~/components/Nav.vue";
import {ref} from "vue";

let post = ref()

function redirect(id) {
  navigateTo(`/post?group=${id}`);
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
</style>