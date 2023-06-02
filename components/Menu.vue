<template>
  <div id="menu"
       class="absolute top-14 right-0 w-2/3 bg-white min-h-screen h-screen max-h-screen md:w-1/6 z-[11]">
    <div class="px-8 w-full min-h-full flex flex-col items-left gap-4 pt-9">
      <a href="/profile" class="font-bold text-3xl cursor-pointer">Profile</a>
      <a href="/my-groups" class="font-bold text-xl cursor-pointer">Groups</a>
      <a href="/my-posts" class="font-bold text-xl cursor-pointer">My posts</a>
      <h1 class="font-bold text-xl cursor-pointer">My bids</h1>
      <h1 class="font-bold text-xl cursor-pointer" @click.prevent="logout()">Logout</h1>
    </div>
  </div>
</template>

<script>
import {logout} from "~/services/logout";

export default {
  name: "Menu",
  methods: {logout},
}
</script>

<style>

</style>