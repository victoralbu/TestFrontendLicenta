<template>
  <h1>{{ data.name }}</h1>
  <h1>{{ data.email }}</h1>
  <h1>{{ data.jobs_done }}</h1>
  <h1>{{ data.phone_number }}</h1>
  <h1>{{ data.rating }}</h1>
  <h1>{{ data.ratings_nr }}</h1>
</template>

<script setup>
import {getUser} from "~/services/getUser";
import {useDataStore} from "~/services/dataStorage";

let data;

console.log(useDataStore().location)

data = await getUser();

definePageMeta({
  middleware: ['auth', 'validate-token']
})

</script>

<style>

</style>