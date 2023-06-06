<template>
  <section class="max-h-[70svh] m-auto w-11/12 md:max-w-[600px] flex flex-col justify-center mt-14 select-text">
    <ul id="list" class="overflow-y-scroll overflow-x-hidden rounded m-3 max-h-[90svh] ">
      <li v-for="group in groups"
          class="flex flex-col justify-center hover:bg-gray-600 bg-gray-500 rounded drop-shadow-md md:max-w-[600px] mb-3 p-3"
          @click.prevent="redirect(group.id)">
        <div class="text-center flex flex-col justify-center">
          <h1 class="text-2xl md:text-5xl font-bold text-white drop-shadow-md pb-3 select-none">{{ group.name }}</h1>
          <p class="md:text-xl font-bold text-gray-200 drop-shadow-mdd break-words select-none">
            {{ group.description }}</p>
          <h2 class="text-gray-200" draggable="false">Owner: {{ group.admin.name }}</h2>
          <h2 class="text-gray-200" draggable="false">Members: {{ group.members_nr }}</h2>
          <h2 class="text-gray-200" draggable="false">Invite code: {{ group.invite_code }}</h2>
        </div>
        <br>
      </li>
    </ul>
  </section>
</template>

<script setup>
const props = defineProps({
  groups: Object
})

function redirect(group) {
  navigateTo(`/group/${group}`)
}

</script>

<style scoped>
#list::-webkit-scrollbar {
  display: none;
}
</style>