<template>
  <form enctype="multipart/form-data" method="POST">

    <input id="title" v-model="title"
           class=" w-4/5 md:w-2/3 rounded-md bg-transparent border-[3px] border-gray-300 focus:border-[3px] focus:outline-0 focus:outline-offset-0 p-1 select-none text-gray-700 px-2"
           name="title" placeholder="Title"
           required>
    <input id="description" v-model="description"
           class=" w-4/5 md:w-2/3 rounded-md bg-transparent border-[3px] border-gray-300 focus:border-[3px] focus:outline-0 focus:outline-offset-0 p-1 select-none text-gray-700 px-2"
           name="description" placeholder="Description"
           required>
    <br>
    <input v-model="level"
           class=""
           name="level" type="radio" value="Easy">
    <label for="easy">Easy</label>
    <br>
    <input v-model="level"
           class=""
           name="level" type="radio" value="Medium">
    <label for="Medium">Medium</label>
    <br>
    <input v-model="level"
           class=""
           name="level" type="radio" value="Hard">
    <label for="Hard">Hard</label>
    <br>
    <input id="address" v-model="address"
           class=" w-4/5 md:w-2/3 rounded-md bg-transparent border-[3px] border-gray-300 focus:border-[3px] focus:outline-0 focus:outline-offset-0 p-1 select-none text-gray-700 px-2"
           name="address" placeholder="Address"
           required>
    <input id="city" v-model="city"
           class=" w-4/5 md:w-2/3 rounded-md bg-transparent border-[3px] border-gray-300 focus:border-[3px] focus:outline-0 focus:outline-offset-0 p-1 select-none text-gray-700 px-2"
           name="city" placeholder="City"
           required>
    <br>
    <input v-model="urgency"
           class=""
           name="urgency" type="radio" value="Not Urgent">
    <label for="urgency">Not urgent</label>
    <br>
    <input v-model="urgency"
           class=""
           name="urgency" type="radio" value="Urgent">
    <label for="urgency">Urgent</label>
    <br>
    <input v-model="urgency"
           class=""
           name="urgency" type="radio" value="Very Urgent">
    <label for="urgency">Very urgent</label>
    <br>
    <input id="image" ref="files" accept="image/*" multiple="multiple" type="file"
           v-on="images"/>
    <button
        class=" select-none text-[#81A4B7] bg-transparent border border-solid border-[#81A4B7] hover:bg-[#81A4B7] hover:text-white active:[#81A4B7] font-bold uppercase text-sm px-3 py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150  active show"
        @click.prevent="createPost">Create post
    </button>
  </form>
</template>

<script>
import {createPost} from "~/services/posts";

export default {
  data() {
    return {
      title      : '',
      description: '',
      level      : '',
      city       : '',
      address    : '',
      urgency    : '',
      images     : null,
    }
  },
  methods: {
    async createPost() {
      await createPost({
        'title'      : this.title,
        'description': this.description,
        'level'      : this.level,
        'city'       : this.city,
        'address'    : this.address,
        'urgency'    : this.urgency,
        'images'     : this.$refs.files.files
      })
    },
  },
}

definePageMeta({
  middleware: ['validate-token']
})
</script>

<style>

</style>