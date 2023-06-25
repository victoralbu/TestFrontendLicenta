<template>
  <div
      class="wrapper w-full min-h-screen h-screen max-h-screen select-none"
      draggable="false">
    <Nav></Nav>
    <div class="mt-14 overflow-y-scroll h-[77%] sm:h-[95%]">
      <form class="p-3 w-full flex flex-col justify-center items-center " enctype="multipart/form-data"
            method="POST">

        <input id="title" v-model="title"
               class=" w-4/5 md:w-[300px] rounded-md bg-transparent border-[3px] border-gray-300 focus:border-[3px] focus:outline-0 focus:outline-offset-0 p-1 select-none text-gray-700 px-2"
               name="title" placeholder="Title"
               required>
        <br>
        <input id="description" v-model="description"
               class=" w-4/5 md:w-[300px] rounded-md bg-transparent border-[3px] border-gray-300 focus:border-[3px] focus:outline-0 focus:outline-offset-0 p-1 select-none text-gray-700 px-2"
               name="description" placeholder="Description"
               required>
        <br>
        <div class="flex gap-3">
          <input v-model="level"
                 class="flex flex-col justify-center"
                 name="level" type="radio" value="Easy">
          <label for="easy">Easy</label>

          <input v-model="level"
                 class="flex flex-col justify-center"
                 name="level" type="radio" value="Medium">
          <label for="Medium">Medium</label>

          <input v-model="level"
                 class="flex flex-col justify-center"
                 name="level" type="radio" value="Hard">
          <label for="Hard">Hard</label>

        </div>
        <br>
        <input id="address" v-model="address"
               class=" w-4/5 md:w-[300px] rounded-md bg-transparent border-[3px] border-gray-300 focus:border-[3px] focus:outline-0 focus:outline-offset-0 p-1 select-none text-gray-700 px-2"
               name="address" placeholder="Address"
               required @focus="clearInput($event)">
        <br>
        <input id="city" v-model="city"
               class=" w-4/5 md:w-[300px] rounded-md bg-transparent border-[3px] border-gray-300 focus:border-[3px] focus:outline-0 focus:outline-offset-0 p-1 select-none text-gray-700 px-2"
               name="city" placeholder="City"
               required @focus="clearInput($event)">
        <br>
        <div class="flex gap-3">
          <input v-model="urgency"
                 class="flex flex-col justify-center"
                 name="urgency" type="radio" value="Not Urgent">
          <label for="urgency">Not urgent</label>
          <br>
          <input v-model="urgency"
                 class="flex flex-col justify-center"
                 name="urgency" type="radio" value="Urgent">
          <label for="urgency">Urgent</label>
          <br>
          <input v-model="urgency"
                 class="flex flex-col justify-center"
                 name="urgency" type="radio" value="Very Urgent">
          <label for="urgency">Very urgent</label>
        </div>
        <br>
        <input id="budget" v-model="budget"
               class=" w-4/5 md:w-[300px] rounded-md bg-transparent border-[3px] border-gray-300 focus:border-[3px] focus:outline-0 focus:outline-offset-0 p-1 select-none text-gray-700 px-2"
               name="budget" placeholder="Budget in Euro" type="number">
        <br>
        <input id="image" ref="files" accept="image/*" multiple="multiple" type="file"
               @change="handleFileUpload($event)"/>
        <br>
        <button
            class=" select-none text-[#81A4B7] bg-transparent border border-solid border-[#81A4B7] hover:bg-[#81A4B7] hover:text-white active:[#81A4B7] font-bold uppercase text-sm px-3 py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150  active show"
            @click.prevent="post">Create post
        </button>
      </form>
      <div id="imgArea" class="flex flex-col md:flex-row w-full justify-center items-center">

      </div>
    </div>
  </div>
</template>

<script setup>
import {createPost} from "~/services/posts";
import {ref} from "vue";
import {Loader} from "@googlemaps/js-api-loader";

let title       = ref();
let description = ref();
let level       = ref();
let city        = ref();
let address     = ref();
let urgency     = ref();
let budget      = ref();
let images      = ref(null);

const loader = new Loader({
  apiKey   : "AIzaSyCRfsJ4SHrgKLZJI17qoej0JFoPZiR_O2s",
  version  : "weekly",
  language : "en",
  libraries: ["places"],
});

onMounted(() => {
  loader.load().then((google) => {
    let locationInputElement = document.getElementById('city')
    let addressInputElement  = document.getElementById('address')

    let autocomplete  = new google.maps.places.Autocomplete(locationInputElement, {types: ['(cities)']})
    let autocomplete2 = new google.maps.places.Autocomplete(addressInputElement, {types: ['address']})

    autocomplete.addListener("place_changed", () => {
      city.value = autocomplete.getPlace('city').name;
    })
    autocomplete2.addListener("place_changed", () => {
      address.value = autocomplete2.getPlace('address').name;
    })

  }).catch(e => {
    console.log(e)
  })
})

function clearInput(e) {
  e.srcElement.value = '';
}

function handleFileUpload(e) {
  images = e.target.files

  let imgArea = document.getElementById('imgArea');

  const allImg = imgArea.querySelectorAll('img');

  allImg.forEach(item => item.remove());

  for (let i = 0; i < images.length; i++) {

    const reader = new FileReader();

    reader.onload = () => {
      const imgUrl = reader.result;

      const img     = document.createElement('img');
      img.className = 'w-[400px] h-[400px] p-2'
      img.src       = imgUrl;
      imgArea.appendChild(img);
      imgArea.classList.add('active');
    }

    reader.readAsDataURL(images[i]);
  }
}

async function post() {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  createPost({
    'title'      : title.value,
    'description': description.value,
    'level'      : level.value,
    'city'       : city.value,
    'address'    : address.value,
    'urgency'    : urgency.value,
    'images'     : images,
    'budget'     : budget.value,
    'group_id'   : urlParams.get('group'),
  }).then(r=> {
    window.location.reload();
  })
}

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