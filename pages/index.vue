<template>
  <div class="wrapper w-full bg-gradient-to-tr from-[#ffd89b] to-[#19547b] ">

    <Nav/>
    <Post class="mt-14 select-none" draggable="false"/>


<!--  <a class=" bg-transparent absolute rotate-45 bottom-3 right-3 rounded md:bottom-8 md:right-8  bg-white/[0.9] w-[50px] h-[50px] z-10 select-none shadow-md md:w-[100px] md:h-[100px] "-->
<!--     draggable="false" href="/post"><img alt="plus"-->
<!--                                         class="w-[50px] md:w-[100px] rotate-45 select-none"-->
<!--                                         draggable="false" src="/assets/images/plus.svg"></a>-->

  </div>
</template>

<script>
export default {

  mounted() {
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
  }
}

definePageMeta({
  middleware: ['auth', 'validate-token']
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

</style>