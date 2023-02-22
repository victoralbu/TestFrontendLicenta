<template>
  <button
      class="absolute select-none text-[#81A4B7] bg-transparent border border-solid border-[#81A4B7] hover:bg-[#81A4B7] hover:text-white active:[#81A4B7] font-bold uppercase text-sm px-3 py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150  active show top-1.5 right-1.5"
      @click.prevent="logout">
    Logout
  </button>

  <div id="posts-container" class="flex flex-col items-center mt-14">
    <ul>

      <li v-for="job in data" class="">
        <div class="bg-blue-200 m-4 relative">
          <h2 class="text-center text-3xl">{{ job.title }}</h2>
          <p class="text-center text-xl">{{ job.description }}</p>
          <p :class="{ 'bg-red-500': job.level === 'Hard','bg-yellow-500': job.level === 'Medium','bg-green-500': job.level === 'Easy' }"
             class="text-center text-xl absolute top-1 right-1 p-0.5">
            {{ job.level }}</p>
          <p class="text-center text-xl">{{ job.budget }}</p>
        </div>
      </li>

    </ul>
  </div>

</template>

<script>
import {logout} from "~/services/auth";
import {getPosts} from "~/services/getData";

export default {
  data() {
    return {
      easy: false,
      data: {}
    }
  },
  async created() {
    this.data = await getPosts()
  },
  methods: {
    logout() {
      logout()
    },
  },
}

definePageMeta({
  middleware: ['auth', 'validate-token']
})
</script>

<style>
body::-webkit-scrollbar {
  display: none;
}
</style>