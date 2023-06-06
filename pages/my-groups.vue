<template>
  <div class="wrapper w-full bg-gradient-to-tr from-[#ffd89b] to-[#19547b] min-h-screen h-screen max-h-screen">
    <Nav title="/groups"/>
    <Group class="mt-14 " v-bind:groups="groups" draggable="false"/>
    <div class="flex justify-evenly absolute bottom-28 md:bottom-0 w-full mb-2">
      <div
          class="bg-gray-500 text-center p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700 m-auto"
          @click.prevent="showCreateModal = !showCreateModal">
        Create
      </div>
      <div
          class="py-3 px-4 bg-gray-500 text-center font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700 m-auto"
          @click.prevent="showJoinModal = !showJoinModal">
        Join
      </div>
    </div>
  </div>

  <div v-show="showCreateModal"
       class="absolute flex flex-col align-middle items-center justify-center z-[12] md:w-[600px] md:px-0 w-11/12 min-h-[150px] max-h-screen-[150px] h-[250px] text-center left-0 right-0 m-auto top-16 bg-gray-200 rounded-md shadow-md gap-4 bg-gray-100 select-none p-3"
       draggable="false">

    <input id="group-name" class="pl-1 text-center md:text-xl font-bold w-4/5 bg-gray-50 rounded-md min-h-[50px]"
           placeholder="Group name" type="text">

    <textarea id="group-description" class="rounded-md w-4/5 p-2 bg-gray-50" maxlength="250"
              placeholder="Description..."></textarea>

    <div class="w-full flex justify-evenly">

      <div
          class="bg-gray-500 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700"
          @click.prevent="showCreateModal = !showCreateModal">
        Close
      </div>

      <div
          class="bg-gray-400 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700"
          @click.prevent="createGroup">
        Create
      </div>

    </div>

  </div>

  <div v-show="showJoinModal"
       class="absolute flex flex-col align-middle items-center justify-center z-[12] md:w-[600px] md:px-0 w-11/12 min-h-[150px] max-h-screen-[150px] h-[250px] text-center left-0 right-0 m-auto top-16 bg-gray-200 rounded-md shadow-md gap-4 bg-gray-100 select-none p-3"
       draggable="false">

    <input id="invite-code" class="pl-1 text-center md:text-xl font-bold w-4/5 bg-gray-50 rounded-md min-h-[50px]"
           placeholder="Invite code" type="text">

    <div class="w-full flex justify-evenly">

      <div
          class="bg-gray-500 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700"
          @click.prevent="showJoinModal = !showJoinModal">
        Close
      </div>

      <div
          class="bg-gray-400 p-3 font-bold text-white rounded-md cursor-pointer text-gray-100 active:bg-gray-400 hover:text-gray-700"
          @click.prevent="joinGroup">
        Join
      </div>

    </div>

  </div>

  <transition enter-active-class="transition duration-700" enter-from-class="opacity-0"
              leave-active-class="transition duration-700" leave-to-class="opacity-0">
    <div v-if="showJoinModal || showCreateModal" class="absolute w-full min-h-screen bg-gray-600/[0.7] z-10 fixed select-none" draggable="false"
         @click="showJoinModal = false;showCreateModal = false"></div>
  </transition>
</template>

<script setup>
import getGroups from "~/services/getGroups";
import {ref} from "vue";

let groups = await getGroups();

let showCreateModal = ref(false);

let showJoinModal = ref(false);

function createGroup() {
  let name        = document.getElementById('group-name').value;
  let description = document.getElementById('group-description').value;

  if (name === '' || description === '') {
    console.log('Provide a name and a description!')
  } else {
    let config = useRuntimeConfig()

    let apiUrl = config.API_URL;

    let payload = {
      'name'       : name,
      'description': description,
    }

    useFetch(`${apiUrl}/groups`, {
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
}

function joinGroup() {
  let inviteCode = document.getElementById('invite-code').value;

  if (inviteCode === '')
    console.log('Please provide a valid invite code!')
  else {
    let config = useRuntimeConfig()

    let apiUrl = config.API_URL;

    let payload = {
      'invite_code': inviteCode,
    }

    useFetch(`${apiUrl}/groups/join`, {
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